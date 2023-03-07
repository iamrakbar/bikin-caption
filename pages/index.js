import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { Switch, Dialog, Transition } from '@headlessui/react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useForm } from 'react-hook-form';

const largeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 300,
  width: 1600,
  colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

export default function Home() {
  const [result, setResult] = useState();
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    const capitalizedCaption =
      data.caption[0].toUpperCase() + data.caption.slice(1).toLowerCase();

    setSuccess(false);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, caption: capitalizedCaption }),
      });

      const res = await response.json();
      if (response.status !== 200) {
        throw (
          res.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(`${capitalizedCaption} ${res.result}`);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (success) {
      openModal();
    }
  }, [success]);

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center py-2'>
        {success && <ConfettiExplosion {...largeProps} />}
        <Head>
          <title>Bikin Caption ✍️</title>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <main className='flex w-full flex-1 flex-col items-center justify-center px-4 lg:px-20 bg-slate-50'>
          {/* <img src='/dog.png' className={styles.icon} /> */}
          <h1 className='text-center text-3xl font-bold tracking-tight text-slate-700'>
            ✍️ <br />
            Bikin Caption
          </h1>
          <div className='relative  -mx-4 shadow-lg ring-1 ring-slate-900/10 sm:mx-0 rounded-xl sm:rounded-3xl w-full sm:w-2/3 lg:w-1/2 lg:flex-none mt-10'>
            <div className='flex absolute -bottom-px left-1/2 -ml-32 lg:-ml-48 h-[2px] w-64 lg:w-96'>
              <div className='w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]' />
              <div className='-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]' />
              <div className='-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]' />
              <div className='-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]' />
            </div>
            <div className='relative bg-white px-4 py-10 rounded-xl sm:rounded-3xl sm:px-10'>
              {/* <form onSubmit={onSubmit}> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className='mt-6'>
                    <label
                      htmlFor='target'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Kamu mau nulis apa? 🥸
                    </label>
                    <input
                      id='caption'
                      type='text'
                      required
                      placeholder='Langsung aja tulis secara singkat di sini'
                      {...register('caption', { required: true })}
                      className='mt-2 block w-full rounded-md border-0 bg-white  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 disabled:opacity-75 disabled:bg-gray-50'
                    />
                    <p className='mt-2 text-sm text-gray-500'>
                      Mau panjang dan lengkap juga boleh
                    </p>
                  </div>

                  <div className='mt-6'>
                    <label
                      htmlFor='target'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Bikin Buat
                    </label>
                    <select
                      // disabled={false}
                      id='target'
                      {...register('target')}
                      className='mt-2 block w-full lg:w-1/2 rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 disabled:opacity-75 disabled:bg-gray-50'
                    >
                      <option>TikTok</option>
                      <option>Instagram</option>
                      <option>Twitter</option>
                      <option>YouTube</option>
                      <option>Apa Aja</option>
                    </select>
                  </div>
                  <div className='flex items-start mt-6'>
                    <div className='flex h-6 items-center'>
                      <input
                        // disabled={false}
                        id='genz'
                        defaultChecked={true}
                        {...register('genz')}
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 disabled:opacity-75'
                      />
                    </div>
                    <div className='ml-3'>
                      <label
                        htmlFor='genz'
                        className='text-sm font-medium leading-6 text-gray-900'
                      >
                        Gen-Z Mode
                      </label>
                      <p className='text-sm text-gray-500'>
                        Biar captionnya kekinian 😎
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start mt-6'>
                    <div className='flex h-6 items-center'>
                      <input
                        // disabled={false}
                        id='galau'
                        defaultChecked={false}
                        {...register('galau')}
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 disabled:opacity-75'
                      />
                    </div>
                    <div className='ml-3'>
                      <label
                        htmlFor='galau'
                        className='text-sm font-medium leading-6 text-gray-900'
                      >
                        Lagi Galau
                      </label>
                      <p className='text-sm text-gray-500'>
                        Cape ya? gapapa istirahat dulu aja 😿
                      </p>
                    </div>
                  </div>
                </div>
                <div className='text-right mt-6'>
                  <button
                    type='submit'
                    className='rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-base font-medium text-white enabled:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-75'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Bentar, mikir dulu... ⏳' : 'Gas Keun! 🤖'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className='mt-4 text-sm text-center text-slate-500'>
            Created with ❤️ by{' '}
            <a
              href='https://twitter.com/rakbar'
              target='_blank'
              rel='noopener noreferrer'
              className='text-cyan-600 hover:underline'
            >
              @rakbar
            </a>{' '}
            and{' '}
            <a
              href='https://twitter.com/atlas45_'
              target='_blank'
              rel='noopener noreferrer'
              className='text-cyan-600 hover:underline'
            >
              @atlas45_
            </a>
            . Powered by{' '}
            <a
              href='https://platform.openai.com/overview'
              target='_blank'
              rel='noopener noreferrer'
              className='text-cyan-600 hover:underline'
            >
              OpenAI
            </a>
          </p>
        </main>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 backdrop-blur-sm bg-white/30' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all border-gray-50 border-4'>
                  <Dialog.Title
                    as='h2'
                    className='text-2xl font-bold tracking-tight text-slate-700'
                  >
                    Caption berhasil dibikin! 🤩🥳🎉
                  </Dialog.Title>

                  <div className='relative mt-4 flex rounded-xl border border-slate-600/10 bg-teal-50 p-6'>
                    <p className='text-sm leading-6 text-slate-700'>
                      <span>{result}</span>
                    </p>
                  </div>

                  <h3 className='mt-2 text-sm  leading-6 text-gray-400'>
                    Langsung copas kuy
                  </h3>

                  <div className='mt-6'>
                    <button
                      type='button'
                      className='rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-base font-medium text-white enabled:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-75'
                      onClick={closeModal}
                    >
                      Ok, Sip! 👍
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
