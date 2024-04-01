import { useState, useEffect, ChangeEvent } from "react";
import { createUrl, deleteUrl } from "../services/Api";
import { isValidUrl } from "../../../url-shortner-be/src/utils/valid-url";

type InputBoxProps = {
  clientCreateUrl: boolean
}

const content = {
  create: {
    label:
      "Create your short url. You can only create 10 urls every 15 minutes.",
    buttonText: "Create short url",
  },
  delete: {
    label: "Delete the short url from the DB.",
    buttonText: "Delete short url",
  },
};

export default function InputBox({ clientCreateUrl }: InputBoxProps) {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [isInvalidUrlEntered, setIsInvalidUrlEntered] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] =
    useState<string>("");

  useEffect(() => {
    setInputUrl('');
    setResponseMessage('');
    setIsInvalidUrlEntered(false);
  }, [clientCreateUrl]);

  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (isValidUrl(e.target.value)) {
      setIsInvalidUrlEntered(false);
      return setInputUrl(e.target.value);
    } 
    return setIsInvalidUrlEntered(true);
  };

  async function callToApi(url: string): Promise<void> {
    if (isInvalidUrlEntered || !inputUrl.length) {
      setIsInvalidUrlEntered(true);
      return;
    }
    if (clientCreateUrl) {
      const response = await createUrl(url);
      setResponseMessage(response);
      return;
    }
      const response = await deleteUrl(url);
      setResponseMessage(response);
      return;
  }

  function copyToClipboard(){
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(responseMessage);
    return Promise.reject("The Clipboard API is not available.");
  }

  return (
    <div>
      <div className="input-box">
        <label className="format text-colour" htmlFor="clientInput">
          {clientCreateUrl ? content.create.label : content.delete.label}
        </label>
        <input name="clientInput" type="text" onBlur={handleChangeEvent} />
        {isInvalidUrlEntered && (
          <p className="text-colour">Invalid url entered</p>
        )}
        <button onClick={() => callToApi(inputUrl)}>
          {clientCreateUrl
            ? content.create.buttonText
            : content.delete.buttonText}
        </button>
        {responseMessage && (
          <>
            <p className="text-colour">{responseMessage}</p>
            {isValidUrl(responseMessage) && (
              <button onClick={() => copyToClipboard()}>
                Copy to clipboard
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}