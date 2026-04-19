import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold border-0 cursor-pointer",
        "bg-slate-900 text-white shadow-soft",
        props.disabled ? "opacity-50" : ""
      ].join(" ")}
    />
  );
}
