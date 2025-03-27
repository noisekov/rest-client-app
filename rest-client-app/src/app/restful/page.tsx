import { HeadersList } from "./components/HeadersList/HeadersList";
import { SelectMethod } from "./components/SelectMethod/SelectMethod";

export default function RestAPI(){
    return (
      <section>
        <h2>RestAPI</h2>  
        <form>
            <fieldset className="border-2  border-black rounded-md ">
                <legend >REST Client</legend>
                <SelectMethod/>
                <input id="path" placeholder="Endpoint URL" className="px-3 py-2 m-2 border rounded"/> 
                <HeadersList/>
                <textarea
              id="code"
              placeholder="// Your code here"
              rows={4}
            />
              <textarea 
                id="body" 
                placeholder='{"key": "value"}'
                rows={6} />
            </fieldset>
        </form>  
        <form>
        <fieldset className="border-2 border-black rounded-md ">
            <legend>Response </legend>
            <div className="mb-4">
            <label htmlFor="response-status">
              Status Code
            </label>
            <input
              id="response-status"
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <div className="mb-2">
            <label htmlFor="response-body">
              Response Body
            </label>
            <textarea
              id="response-body"
              readOnly
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm bg-gray-100"
            />
          </div>
          </div>
        </fieldset></form>       
      </section>)
}