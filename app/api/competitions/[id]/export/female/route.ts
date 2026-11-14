
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { getFemaleFightCard } from "@/lib/fight-card";

export const runtime = "nodejs";

type Registration = Awaited<
    ReturnType<typeof getFemaleFightCard>
>["registrations"][number];

const PAGE_MARGIN = 36;
const PAGE_WIDTH = 595.28; // A4 portrait
const PAGE_HEIGHT = 841.89;
const TABLE_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const BOTTOM_LIMIT = PAGE_HEIGHT - 55;

const ROW_HEIGHT = 24;
const FRAME_PADDING = 7;
const FRAME_X = PAGE_MARGIN - FRAME_PADDING;
const FRAME_WIDTH = TABLE_WIDTH + FRAME_PADDING * 2;

const columns = [
    { title: "FIRST NAME", width: 70 },
    { title: "LAST NAME", width: 78 },
    { title: "CLUB", width: 130 },
    { title: "YEAR OF BIRTH", width: 100 },
    { title: "EXPERIENCE", width: 145.28 },
] as const;

function drawTableHeader(doc: PDFKit.PDFDocument, y: number) {
    let x = PAGE_MARGIN;

    for (const column of columns) {
        doc
            .rect(x, y, column.width, ROW_HEIGHT)
            .fillAndStroke("#e8edf3", "#333333");

        doc
            .fillColor("#1e293b")
            .font("Arial-Bold")
            .fontSize(7)
            .text(column.title, x + 4, y + 8, {
                width: column.width - 8,
                height: ROW_HEIGHT - 8,
                align: "center",
                ellipsis: true,
            });

        x += column.width;
    }

    return y + ROW_HEIGHT;
}

function drawTableRow(
    doc: PDFKit.PDFDocument,
    registration: Registration,
    y: number,
) {
    const fighter = registration.fighters;

    const values = [
        fighter.firstName ?? "-",
        fighter.lastName ?? "-",
        fighter.club?.name ?? "-",
        String(fighter.yearOfBirth ?? "-"),
        String(Number(registration.experience)),
    ];

    let x = PAGE_MARGIN;

    columns.forEach((column, index) => {
        doc
            .rect(x, y, column.width, ROW_HEIGHT)
            .fillAndStroke("#ffffff", "#333333");

        doc
            .fillColor("#334155")
            .font("Arial")
            .fontSize(8)
            .text(values[index], x + 4, y + 7, {
                width: column.width - 8,
                height: ROW_HEIGHT - 7,
                align: "center",
                ellipsis: true,
            });

        x += column.width;
    });

    return y + ROW_HEIGHT;
}

function drawAgeCategoryFrame(
    doc: PDFKit.PDFDocument,
    startY: number,
    endY: number,
) {
    doc
        .lineWidth(1.5)
        .strokeColor("#000000")
        .rect(
            FRAME_X,
            startY,
            FRAME_WIDTH,
            endY - startY,
        )
        .stroke();
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        const { searchParams } = new URL(request.url);
        const experience = searchParams.get("experience") ?? "under5";

        const competition = await prisma.competition.findUnique({
            where: { id },
        });

        if (!competition) {
            return NextResponse.json(
                { error: "Takmičenje nije pronađeno." },
                { status: 404 },
            );
        }

        const { groupedRegistrations } = await getFemaleFightCard(
            id,
            experience,
        );

        const regularFont = path.join(
            process.cwd(),
            "public",
            "fonts",
            "arial.ttf",
        );

        const boldFont = path.join(
            process.cwd(),
            "public",
            "fonts",
            "arialbd.ttf",
        );

        if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
            throw new Error(
                "PDF font files are missing from public/fonts.",
            );
        }

        const doc = new PDFDocument({
            size: "A4",
            layout: "portrait",
            margins: {
                top: PAGE_MARGIN,
                bottom: PAGE_MARGIN,
                left: PAGE_MARGIN,
                right: PAGE_MARGIN,
            },
            bufferPages: true,
        });

        doc.registerFont("Arial", regularFont);
        doc.registerFont("Arial-Bold", boldFont);

        const chunks: Buffer[] = [];

        const pdfBuffer = new Promise<Buffer>((resolve, reject) => {
            doc.on("data", (chunk: Buffer) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);
        });

        // PDF heading.
        doc
            .font("Arial-Bold")
            .fontSize(17)
            .fillColor("#111827")
            .text(competition.name, PAGE_MARGIN, 35, {
                width: TABLE_WIDTH,
                align: "center",
            });

        doc
            .font("Arial-Bold")
            .fontSize(11)
            .fillColor("#991b1b")
            .text("FEMALE FIGHT CARD", PAGE_MARGIN, 59, {
                width: TABLE_WIDTH,
                align: "center",
            });

        let info = competition.location ?? "";

        if (competition.date) {
            const date = new Date(competition.date).toLocaleDateString(
                "sr-RS",
            );
            info += info ? `  |  ${date}` : date;
        }

        doc
            .font("Arial")
            .fontSize(8)
            .fillColor("#64748b")
            .text(info, PAGE_MARGIN, 78, {
                width: TABLE_WIDTH,
                align: "center",
            });

        let y = 108;

        function startNewPage(
            ageCategory: string,
            weightCategory: string,
            frameStartY: number,
        ) {
            drawAgeCategoryFrame(doc, frameStartY, BOTTOM_LIMIT);

            doc.addPage();
            y = PAGE_MARGIN + 8;

            const newFrameStartY = y - 7;

            doc
                .font("Arial-Bold")
                .fontSize(13)
                .fillColor("#991b1b")
                .text(`${ageCategory} (continued)`, PAGE_MARGIN, y);

            y += 21;

            doc
                .font("Arial-Bold")
                .fontSize(10)
                .fillColor("#1e293b")
                .text(
                    `${Number(weightCategory) === 91.5 ? "91+" : weightCategory} kg`,
                    PAGE_MARGIN,
                    y,
                );

            y += 16;
            y = drawTableHeader(doc, y);

            return newFrameStartY;
        }

        // Render age categories and their weight categories.
        for (const [ageCategory, weightGroups] of Object.entries(
            groupedRegistrations,
        )) {
            if (y + 75 > BOTTOM_LIMIT) {
                doc.addPage();
                y = PAGE_MARGIN + 8;
            }

            let frameStartY = y - 7;

            doc
                .font("Arial-Bold")
                .fontSize(13)
                .fillColor("#991b1b")
                .text(ageCategory, PAGE_MARGIN, y);

            y += 21;

            const sortedWeightGroups = Object.entries(
                weightGroups ?? {},
            ).sort(([a], [b]) => Number(a) - Number(b));

            for (const [weightCategory, registrations] of sortedWeightGroups) {
                if (y + 16 + ROW_HEIGHT * 2 > BOTTOM_LIMIT) {
                    doc
                        .lineWidth(1.5)
                        .strokeColor("#000000")
                        .rect(
                            FRAME_X,
                            frameStartY,
                            FRAME_WIDTH,
                            BOTTOM_LIMIT - frameStartY,
                        )
                        .stroke();

                    doc.addPage();
                    y = PAGE_MARGIN + 8;
                    frameStartY = y - 7;

                    doc
                        .font("Arial-Bold")
                        .fontSize(13)
                        .fillColor("#991b1b")
                        .text(`${ageCategory} (continued)`, PAGE_MARGIN, y);

                    y += 21;
                }

                doc
                    .font("Arial-Bold")
                    .fontSize(10)
                    .fillColor("#1e293b")
                    .text(
                        `${Number(weightCategory) === 91.5 ? "91+" : weightCategory} kg`,
                        PAGE_MARGIN,
                        y,
                    );

                y += 16;
                y = drawTableHeader(doc, y);

                for (const registration of registrations) {
                    if (y + ROW_HEIGHT > BOTTOM_LIMIT) {
                        frameStartY = startNewPage(
                            ageCategory,
                            weightCategory,
                            frameStartY,
                        );
                    }

                    y = drawTableRow(doc, registration, y);
                }

                y += 12;
            }

            drawAgeCategoryFrame(
                doc,
                frameStartY,
                y + 7,
            );

            y += 15;
        }

        // Add page numbers to every page.
        const pageRange = doc.bufferedPageRange();

        for (
            let pageIndex = pageRange.start;
            pageIndex < pageRange.start + pageRange.count;
            pageIndex++
        ) {
            doc.switchToPage(pageIndex);

            doc
                .font("Arial")
                .fontSize(8)
                .fillColor("#64748b")
                .text(
                    `Strana ${pageIndex + 1} od ${pageRange.count}`,
                    PAGE_MARGIN,
                    PAGE_HEIGHT - 30,
                    {
                        width: TABLE_WIDTH,
                        align: "center",
                    },
                );
        }

        doc.end();

        const buffer = await pdfBuffer;

        return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="fight-card-female-${id}.pdf"`,
            },
        });
    } catch (error) {
        console.error("Female Fight Card PDF export error:", error);

        return NextResponse.json(
            { error: "Greška prilikom generisanja PDF dokumenta." },
            { status: 500 },
        );
    }
}
