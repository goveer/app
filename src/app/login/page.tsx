import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col space-y-4 max-w-md mx-auto mt-8 p-8">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email:
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password:
        </label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          formAction={login}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
        <button 
          formAction={signup}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
