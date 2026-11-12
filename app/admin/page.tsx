"use client";
import { FormEvent, FormEventHandler } from "react"


export default function AdminPage(){

    const handleAddGymSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const dataFormAddGym = new FormData(e.currentTarget)

        //JavaScriptObject
        const gymData = {  
                name: dataFormAddGym.get("clubname"),
                state: dataFormAddGym.get("clubstate"), 
                city: dataFormAddGym.get("clubcity"),
                country: dataFormAddGym.get("clubcountry")
        }

        try{
            await fetch("/api/admin/addnewgym", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(gymData)
            })
        }catch{
            console.log("Internal server error")
        }
    
    }

    const handleAddCompetitionSubmit = async(e: FormEvent<HTMLFormElement>) =>{
            e.preventDefault();

            const competitionDataHTML = new FormData(e.currentTarget);

            console.log(competitionDataHTML);

            const competitionData = {
                name: competitionDataHTML.get("competitionname"),
                location: competitionDataHTML.get("competitionlocation"),
                date: competitionDataHTML.get("competitiondate"),
                registrationDeadline: competitionDataHTML.get("competitiondeadline"),
                status: competitionDataHTML.get("competitionstatus")
            }
            console.log("competitionData:",competitionData);

            try{
                await fetch("/api/admin/addnewcompetition", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(competitionData)
                })

            }catch(error){
                console.log("Internal server error")
            }
    }
    return(
        <div className="max-w-6xl mx-auto px-6 py-10">
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form
                    className="bg-white border border-red-100 rounded-xl p-6 shadow-lg space-y-6"
                    onSubmit={handleAddCompetitionSubmit} 
                    >
                    <div className="max-w-4xl mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-red-900 mb-2">REGISTER NEW COMPETITION</h2>
                            <p className="text-gray-500 mb-6">Add a new competition to the database</p>
                            <div className="space-y-2 mb-5">
                                <label htmlFor="competitionname" className="block font-semibold text-gray-700">Competition Name</label>
                                <input type="text" name="competitionname" id="competitionname" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"/>
                            </div>
                            <div>
                                <label htmlFor="competitionlocation" className="block font-semibold text-gray-700">Competition Location</label>
                                <input type="text" name="competitionlocation" id="competitionlocation" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"/>
                            </div>
                            <div>
                                <label htmlFor="competitiondate" className="block font-semibold text-gray-700">Competition Date</label>
                                <input type="date" name="competitiondate" id="competitiondate" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"/>
                            </div>
                            <div>
                                <label htmlFor="competitiondeadline" className="block font-semibold text-gray-700">Registration Deadline</label>
                                <input type="date" name="competitiondeadline" id="competitiondeadline" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"/>
                            </div>
                            <div>
                                <label htmlFor="competitionstatus" className="block font-semibold text-gray-700">Competition status</label>
                                <select name="competitionstatus" id="competitionstatus" className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-800">
                                    <option value="">Select competition status</option>
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
                                    <option value="REGISTRATION_CLOSED">REGISTRATION_CLOSED</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="FINISHED">FINISHED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-red-900 text-white font-bold py-3 rounded-lg hover:bg-red-800 transition"
                                >REGISTER THE COMPETITION
                            </button>
                    </div>
                </form>
                { }
                <form 
                    className="bg-white border border-red-100 rounded-xl p-6 shadow-lg space-y-6"
                    onSubmit={handleAddGymSubmit}
                >
                    <div>
                        <h2 className="text-2xl font-bold text-red-900 mb-2">REGISTER NEW GYM</h2>
                        <p className="text-gray-500 mb-6">Add a new club or gym to the database</p>
                        <div className="space-y-2 mb-5">
                            <label htmlFor="clubname" className="block font-semibold text-gray-700">Club name</label>
                            <input type="text" name="clubname" id="clubname" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800" />
                        </div>
                        <div className="space-y-2 mb-5">
                            <label htmlFor="clubstate" className="block font-semibold text-gray-700">State</label>
                            <input type="text" name="clubstate" id="clubstate" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"/>
                        </div>
                        <div className="space-y-2 mb-5">
                            <label htmlFor="clubcity" className="block font-semibold text-gray-700">City</label>
                            <input type="text" name="clubcity" id="clubcity" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800" />
                        </div>
                        <div className="space-y-2 mb-5">
                            <label htmlFor="clubcountry" className="block font-semibold text-gray-700">Country</label>
                            <input type="text" name="clubcountry" id="clubcountry" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800" />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-900 text-white font-bold py-3 rounded-lg hover:bg-red-800 transition"
                            >REGISTER THE CLUB
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}