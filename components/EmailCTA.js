import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const EmailCTA = ({
  title = 'Subscribe to the Newsletter',
  description = 'Subscribe to get my latest content by email.',
  list = 'monthly',
  cta = 'Subscribe',
  embedded = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm()

  const subscribe = async ({ firstName, email }) => {
    const res = await fetch(
      `/api/subscribe?first_name=${firstName}&email=${email}&list=${list}`
    )
    return res
  }

  const onSubmit = (data) => {
    console.log('data', data)
    subscribe(data)
  }

  return (
    <div className="">
      <div className="mx-auto">
        <div
          className={`${
            embedded ? 'px-4 py-2' : 'px-4 py-4 md:px-12 md:py-12'
          } bg-gray-100 dark:bg-gray-800 rounded-xl lg:flex lg:items-center`}
        >
          {isSubmitSuccessful ? (
            <div>
              <h1 class="text-2xl mb-4">Just one more thing...</h1>
              <p>
                Thank you for subscribing. You will need to check your inbox and
                confirm your subscription.
              </p>
            </div>
          ) : (
            <>
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {title}
                </h2>
                <p className="my-4 max-w-3xl text-md">{description}</p>
              </div>
              <div className="sm:w-full sm:max-w-md lg:ml-8 lg:flex-1">
                <form
                  className="sm:flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label htmlFor="first-name" className="sr-only">
                    Your first name
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    className="w-full border-gray-500 dark:border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-gray-800 dark:focus:ring-white rounded-md text-black mb-3"
                    placeholder="Your first name"
                    {...register('firstName')}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full border-gray-500 dark:border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-gray-800 dark:focus:ring-white rounded-md text-black"
                    placeholder="Your email address"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      },
                      message: 'Please enter a vaild email.',
                    })}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage errors={errors} name="email" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:w-auto sm:flex-shrink-0"
                  >
                    {cta}
                  </button>
                </form>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-100">
                  I won't send you spam. Unsubscribe at any time.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailCTA
