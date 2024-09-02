"use client";
//REACT
import { useState, useEffect, useRef } from 'react';
//REACT-HOOK-FORM
import { useForm } from 'react-hook-form';
//APPSYNC-MUTATIONS
import { handleCreateUploader } from './appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchAllUploaders } from './appsync_functions/queries';
//SDK-FUNCTIONS
import { fileUploader, filesDownloader } from './sdk_functions';



export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch
    }: any = useForm({
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            file: null
        }
    });



    const onSubmit = handleSubmit(
        async (data: any) => {
            /****************************************************/
            //s3 ( aws-sdk )
            const fileUploaded = await fileUploader(data.file[0]);
            /****************************************************/

            if (
                /* if 's3' successful, only then fire 'appsync' */
                fileUploaded
            ) {
                /***************************************************************************/
                //AppSync ( aws-amplify )
                await handleCreateUploader(data.name, data.surname, data.email, fileUploaded);
                /***************************************************************************/
                getData();
                reset();
            }
        }
    );



    const file = watch("file");



    const [loading, setLoading] = useState<any>(null);
    const [allUploaders, setAllUploaders] = useState<any>([]);
    const getData = async () => {
        setLoading(true);
        /******************************************/
        //AppSync ( aws-amplify )
        const uploaders = await fetchAllUploaders();
        setAllUploaders(uploaders);
        /******************************************/
        setLoading(false);
        scrollToBottom();
    }
    useEffect(() => {
        getData();
    }, []);



    const divRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 py-5 lg:py-0">
            {/* Form */}
            <div className="max-w-3xl bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> S3 Uploader App </div>

                <form onSubmit={onSubmit} autoComplete="off" className="max-w-96 m-auto bg-black shadow-md rounded-md p-3 sm:p-6 flex justify-center flex-col">
                    <div className="mb-2 sm:mb-4">
                        <label htmlFor="username" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: { value: true, message: 'Name is required' },
                                minLength: { value: 3, message: 'Name must be at least 3 characters' },
                                maxLength: { value: 20, message: 'Name cannot exceed 10 characters' }
                            })}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                            placeholder="Enter your name"
                            disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="mb-2 sm:mb-4">
                        <label htmlFor="username" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                            Surname
                        </label>
                        <input
                            type="text"
                            {...register("surname", {
                                required: { value: true, message: 'Surname is required' },
                                minLength: { value: 3, message: 'Surname must be at least 3 characters' },
                                maxLength: { value: 30, message: 'Surname cannot exceed 10 characters' }
                            })}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                            placeholder="Enter your surname"
                            disabled={isSubmitting}
                        />
                        {errors.surname && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.surname.message}</span>}
                    </div>

                    <div className="mb-2 sm:mb-4">
                        <label htmlFor="username" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: { value: true, message: 'Email is required' },
                                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Invalid email' }
                            })}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                        />
                        {errors.email && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="mb-0.5 sm:mb-1">
                        <label htmlFor="file" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                            Upload File
                        </label>
                        <div className="flex items-center">
                            <input
                                type="file"
                                {...register('file', {
                                    required: { value: true, message: 'File is required' }
                                })}
                                className="hidden"
                                disabled={isSubmitting}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center py-1 px-2 sm:py-2 sm:px-4 bg-blue-500 text-white rounded-md shadow-sm text-xs sm:text-sm">
                                Choose File
                            </label>
                            <span className="ml-3 text-gray-600 text-xs sm:text-sm">{file && file[0]?.name}</span>
                        </div>
                        {errors.file && <span className="text-red-500 text-xs sm:text-sm mt-1">{errors.file.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-4 sm:mt-5 text-xs sm:text-sm"
                    >
                        {isSubmitting ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg> : `Submit`}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="max-w-3xl bg-white shadow-md rounded-md p-6 space-y-5">
                <div className="text-center font-bold text-3xl sm:text-5xl text-black"> {allUploaders ? `${allUploaders?.length} Files` : `Loading`} </div>

                {
                    allUploaders?.length ? (
                        <div className="overflow-y-scroll max-h-64">
                            <table className="min-w-full bg-black shadow-md rounded-md p-3 sm:p-6">
                                <thead className="sticky top-0 z-10 bg-black">
                                    <tr className="text-left">
                                        <th className="border-solid border-2 border-sky-500 w-4/5 px-2 py-2 text-white">Image</th>
                                        <th className="border-solid border-2 border-sky-500 w-1/5 px-2 py-2 text-white">Name</th>
                                        <th className="border-solid border-2 border-sky-500 w-1/5 px-2 py-2 text-white">Surname</th>
                                        <th className="border-solid border-2 border-sky-500 w-1/5 px-2 py-2 text-white">Email</th>
                                        <th className="border-solid border-2 border-sky-500 w-1/5 px-2 py-2 text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUploaders.map((item: any) => (
                                            <tr key={item.id} className="mb-2">
                                                <td className="border-solid border-2 border-sky-500 w-1/5 px-2 py-1 text-green-500 font-bold tracking-wide">
                                                    <img
                                                        src={item.fileName}
                                                        alt="file"
                                                    />
                                                </td>
                                                <td className="border-solid border-2 border-sky-500 w-1/5 px-2 py-1 text-yellow-500 font-bold tracking-wide">
                                                    {item.name}
                                                </td>
                                                <td className="border-solid border-2 border-sky-500 w-1/5 px-2 py-1 text-yellow-500 font-bold tracking-wide">
                                                    {item.surname}
                                                </td>
                                                <td className="border-solid border-2 border-sky-500 w-1/5 px-2 py-1 text-yellow-500 font-bold tracking-wide">
                                                    {item.email}
                                                </td>
                                                <td className="border-solid border-2 border-sky-500 w-1/5 px-2 py-1 space-x-1 mx-5 text-center">
                                                    <button
                                                        disabled={loading}
                                                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                                                        onClick={async () => {
                                                            setLoading(true);
                                                            await filesDownloader(item.fileName);
                                                            getData();
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <div ref={divRef}></div>
                                </tbody>
                            </table>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}