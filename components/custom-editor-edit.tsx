"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { classNames } from "@/libs/tools";
import { FieldError } from "react-hook-form";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditorEdit({
  error,
  id,
  value,
  onChange,
}: {
  error: FieldError | undefined;
  id: string;
  value: string;
  onChange: Function;
}) {
  return (
    <>
      <div
        className={classNames(
          "z-10 block w-full rounded-lg border-2",
          "border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-600",
          "focus:ring-blue-600 dark:border-gray-500 dark:bg-blue-600 dark:text-gray-900",
          "dark:placeholder-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
          !!error?.message
            ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:border-red-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            : "",
        )}
      >
        <CKEditor
          id={id}
          editor={ClassicEditor}
          config={editorConfiguration}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
      <p className="mt-1 text-xs font-semibold text-red-600">
        {error?.message}
      </p>
    </>
  );
}

export default CustomEditorEdit;
