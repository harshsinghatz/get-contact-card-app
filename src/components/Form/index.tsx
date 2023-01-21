import React, { useContext, useEffect, useState } from "react";
import { trpc } from '../../utils/trpc';
import { compress } from '../../utils/lzstring';
import ToastContext from "../../context/ToastContext";

const getSrcFromBase64 = (url: string) => `data:image/png;base64, ${url}`;

const Form = () => {
    const [customTweet, setCustomTweet] = useState<string>("");
    const [customImage, setCustomImage] = useState<Blob>();
    const [base64ImageFormat, setBase64Image] = useState<string>("");
    const userMutation = trpc.user.updateUser.useMutation();
    const { addToast } = useContext(ToastContext);
    const userQuery = trpc.user.getUser.useQuery();

    const convertImageToBase64 = () => {
        const reader = new FileReader();

        reader.onload = function () {
            if (reader.result && typeof reader.result === 'string') {
                const base64Img = reader.result.replace("data:", "").replace(/^.+,/, "");
                setBase64Image(base64Img);
            }
        };
        if (customImage) {
            reader.readAsDataURL(customImage);
        }
    }
    const onTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomTweet(e.target.value);
    const onCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if (!file) return;
        setCustomImage(file);
    }
    const onSubmit = (e:any) => {
        e.preventDefault();
        if (!customTweet && !base64ImageFormat) return;
        let compressedStr;
        if (base64ImageFormat) {
            compressedStr = compress(base64ImageFormat);
            console.log(compressedStr.length, base64ImageFormat.length);
        }
        userMutation.mutate({ tweet: customTweet, image64Base: base64ImageFormat });
    }

    const removeImage = () => {
        setBase64Image('');
    }

    useEffect(() => {
        convertImageToBase64();
    }, [customImage]);

    useEffect(() => {
        if (userMutation.isError) {
            addToast({
                message: 'Something went wrong!',
                status: "error",
            });
        }

        if (userMutation.isSuccess) {
            addToast({
                message: 'Sucessfull!',
                status: "success",
            });
        }

        if (userMutation.isLoading) {
            addToast({
                message: 'Loading...',
                status: "loading",
            });
        }

        console.log(userMutation);
    }, [userMutation.isError, userMutation.isSuccess, userMutation.isLoading]);

    useEffect(() => {
        const { cardImage = "", tweet = "" } = userQuery?.data || {};
        if (cardImage) {
            setBase64Image(cardImage);
        }
        if (tweet) {
            setCustomTweet(tweet);
        }

        if (userQuery.isLoading) {
            addToast({
                message: 'Loading...',
                status: "loading",
            });
        }
    }, [userQuery?.data?.cardImage, userQuery?.data?.tweet, userQuery.isLoading])

    return <>
        <form className="m-10 p-2" onSubmit={onSubmit}>
            <div>
                <label htmlFor="custom-tweet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your custom tweet</label>
                <textarea id="custom-tweet" rows={4} value={customTweet} onChange={onTweetChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your custom tweet here..."></textarea>
            </div>
            <div className="my-5">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your custom contact card</p>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" accept=".jpg, .png, .jpeg" className="hidden" onChange={onCustomImageUpload} />
                    </label>
                </div>
            </div>
            <div>
                {base64ImageFormat && <div className="flex flex-col align-middle justify-center w-100">
                    <button onClick={removeImage} type="button" className="bg-white self-end rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img className="w-11/12 p-10 w-90 max-w-4xl self-center" src={getSrcFromBase64(base64ImageFormat)} alt='custom-image' />
                </div>}
            </div>
            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
        </form>
    </>
}

export default Form;
