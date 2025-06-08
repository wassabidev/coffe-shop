import { Instagram, Twitter, Facebook } from "lucide-react";

function ContactUsPage() {
  return (
    <section className="w-full">
      <h1 className="text-lg lg:text-2xl font-semibold text-center my-4">
        Contactanos
      </h1>
      <div className="max-w-[720px]  mx-auto">
        <h2 className="text-xl font-semibold text-left my-4">Social media</h2>
        <div className="flex gap-6 text-2xl text-slate-700">
          <a
            href="https://facebook.com/coffecat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
          <a
            href="https://instagram.com/coffecat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
          <a
            href="https://twitter.com/coffecat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
          <a
            href="https://tiktok.com/@coffecat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactUsPage;
