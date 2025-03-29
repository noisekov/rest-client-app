import { HeadersList } from '@/components/HeadersList/HeadersList';
import { SelectMethod } from '@/components/SelectMethod/SelectMethod';
import { Button } from '@/components/ui/button';

export default function RestAPI() {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">RestAPI</h2>
      <form className="mb-8">
        <fieldset className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
          <legend className="px-2 font-semibold text-lg">REST Client</legend>
          <SelectMethod />
          <input
            id="path"
            placeholder="Endpoint URL"
            className="px-3 py-2 m-2 border rounded"
          />
          <HeadersList />
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Code
            </label>
            <textarea
              id="code"
              placeholder="// Your code here"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm "
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Request Body
            </label>
            <textarea
              id="body"
              placeholder='{"key": "value"}'
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm "
            />
          </div>
          <Button type="button" className="cursor-pointer">
            Send Request
          </Button>
        </fieldset>
      </form>

      <form>
        <fieldset className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
          <legend className="px-2 font-semibold text-lg">Response </legend>
          <div className="mb-4">
            <label
              htmlFor="response-status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status Code
            </label>
            <input
              id="response-status"
              readOnly
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <div className="mb-2">
              <label
                htmlFor="response-body"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
        </fieldset>
      </form>
    </section>
  );
}
