import { useState , useEffect} from 'react'

function Table(){

    const [tables,setTables]=useState([]);
    useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/users').then(response =>{console.log(response)
                return response.json()
            }).then(result=>
                setTables(result)
            )
        },[]);
    return(
        <>
        <div>
            <table className="min-w-full border border-gray-300 m-1">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Website</th>
            </tr>
          </thead>

          <tbody>
            {tables.map((data) => (
              <tr key={data.id}>
                <td className="border border-black p-2">{data.id}</td>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">{data.username}</td>
                <td className="border p-2">{data.email}</td>
                <td className="border p-2">{data.phone}</td>
                <td className="border p-2">{data.website}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
        
        
        
    </>
        

    );
}

export default Table