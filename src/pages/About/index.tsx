import type { Component } from "solid-js";

export default function About() {
  return (
    <div className="grid grid-cols-1 mt-10 place-items-center">
      <h1 className="w-1/2 text-2xl">I go by Maxwell-</h1>
      <p className="mt-5 w-1/2 text-m">
        I am a human and a painter.
        <br />
        <br />I am currently in the process of building this site.
        <br />I hope to implement a function that facilitates the purchasing of
        my art via PayPal with the ability to make and except offers!
        <br />
        <br />
        I also hope to include a contact page for commissions and general
        requests.
        <br />
        <br />
        In the meantime you are free to enjoy the gallery.
        <br />
        <br />
        thank you for stopping by,
        <br />
        mhw 🎨
      </p>
    </div>
  );
}
