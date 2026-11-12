"use client";
import { FormEvent, useEffect, useState } from "react"


type Competition = {
  id: string;
  name: string;
};

type Gym = {
  id: string;
  name: string;
};




export default function RegisterFighterPage()
{   //useState čuva takmičenja koja dodju iz baze.
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [gyms, setGyms] = useState<Gym[]>([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchCompetitions(){
            const response =  await fetch("/api/competitions");
            const data = await response.json()

            setCompetitions(data)
        }

        fetchCompetitions();
    },[])

    useEffect(()=>{
        async function fetchGyms(){
            const response = await fetch("api/gyms");
            const data = await response.json()

            setGyms(data);
        }
        fetchGyms();
    }, [])

    function handleGymsChange(event: React.ChangeEvent<HTMLSelectElement>){
        const selectedGymId = event.target.value;
        console.log("Selected GYM ID:", selectedGymId);
    }

    function handleCompetitionChange( event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCompetitionId = event.target.value;

        console.log("Selected competition ID:", selectedCompetitionId);
    }

    const handleFighterRegistrationSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        //I would say, we are collecting entered data in const data = {...}
        const fighterDataHTML = new FormData(form);
        //data is javascript object
        const data = {
            competitionId: fighterDataHTML.get("selectcompetition"),
            firstName: fighterDataHTML.get("firstname"),
            lastName: fighterDataHTML.get("lastname"),
            gender: fighterDataHTML.get("gender"),
            yearOfBirth: fighterDataHTML.get("birthyear"),
            clubId: fighterDataHTML.get("gym"),
            weight: fighterDataHTML.get("weight"),
            experience: fighterDataHTML.get("experience")
        }
        //now we need to send those data through API request
        //it will be created at app/api/registerfighter/route.ts. Naming convention & fodler structure are so important,
        // we have route.ts also in app/api/auth/[..nextauth] but it is completly different action

        try{
            const response = await fetch("/api/registerfighter", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data) //covnert JS object(data) to JSON
            })
            
            const result = await response.json()

            if(!response.ok){
                setSuccess(false);
                setMessage(result.message ?? "Registracija nije uspela.");
                return;
            }

            setSuccess(true);
            setMessage("Prijava borca je uspešno obavljena.")
            form.reset();

        }catch(error){
            setSuccess(false);
            setMessage("Greška pri povezivanju sa serverom.")
        }
    }

    const findRegisteredCompetitions = async() =>{
        console.log("Lets try to read competitons from database")

        try{
            await fetch("api/competitions/",{

            })

        }catch(error){

        }
    }

    return(
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Register your fighter</h1>
            <form 
                className="bg-white border border-red-100 rounded-xl p-6 shadow-lg space-y-6" 
                onSubmit={handleFighterRegistrationSubmit}>
                <div>
                    <label htmlFor="selectcompetition" className="block text-sm font-medium text-gray-700">Select Competition</label>
                     <select
                        name="selectcompetition"
                        id="selectcompetition"
                        onChange={handleCompetitionChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                        >
                        <option value="">Select a competition</option>

                        {competitions.map((competition) => (
                            <option key={competition.id} value={competition.id}>
                            {competition.name}
                            </option>
                        ))}
                        </select>
                </div>
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="firstname" id="firstname" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                </div>

                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lastname" id="lastname" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" id="gender" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50">
                        <option value="">Select a gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birthyear" className="block text-sm font-medium text-gray-700">Year of birth</label>
                    <input type="text" name="birthyear" id="birthyear" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                </div>
                <div>
                    <label htmlFor="gym" className="block text-sm font-medium text-gray-700">Select Gym</label>
                     <select
                        name="gym"
                        id="gym"
                        onChange={handleGymsChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                        >
                        <option value="">Select a gym</option>

                        {gyms.map((gyms) => (
                            <option key={gyms.id} value={gyms.id}>
                            {gyms.name}
                            </option>
                        ))}
                        </select>
                </div>
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                    <input type="text" name="weight" id="weight" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                </div>
                <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                    <p>Total number of fights</p>
                    <input type="text" name="experience" id="experience" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-red-900 text-white font-bold py-3 rounded-lg hover:bg-red-800 transition"
                    >REGISTER A FIGHTER
                </button>
                {message && (
                    <p
                        role="status"
                        className={success
                            ? "mt-3 text-sm text-green-700"
                            : "mt-3 text-sm text-red-700"
                        }
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}