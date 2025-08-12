'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const Atglance = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

      {/* Stats Row */}
      <section className="h-80 rounded-3xl p-6 md:p-10 bg-gradient-to-r from-indigo-100 via-indigo-400 to-indigo-100 dark:bg-gradient-to-r dark:from-black dark:via-indigo-900 dark:to-black text-black dark:text-white transition-all duration-500 ease-in-out">
        <h2 className="text-2xl font-bold mb-6">At a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "750", label: "Partners" },
            { value: "150,000+", label: "Monthly Orders" },
            { value: "19", label: "Districts" },
            { value: "500+", label: "Drivers" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm">{stat.label} as of Jan 30, 2022</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two Side Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          {
            title: "Order from your favorite restaurants",
            desc: "Unleash the full flavor of our cuisine and our partnership!",
            cta: "Sign up now your restaurant →",
            img: "/images/image1.png"
          },
          {
            title: "Try our App",
            desc: "Discover a world of flavors at your fingertips!",
            cta: "Download App →",
            img: "/images/image2.png"
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 items-center">
            <Image
              src={item.img}
              alt={item.title}
              width={200}
              height={200}
              className="rounded-xl object-cover"
            />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>{item.desc}</p>
              <p className="text-primary font-medium">{item.cta}</p>
            </div>
          </div>
        ))}
      </section>

      {/* App Promotion */}
      <section id="products" className="scroll-mt-20 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-2xl font-bold">It&apos;s all in here.</h3>
          <h3 className="text-2xl font-bold">All in one app.</h3>
          <p>
            Where flavor meets value: discover new restaurants and dishes for a price that&apos;s just right!
          </p>
          <Button>Find Restaurant</Button>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/images/image3.png"
            alt="App Preview"
            width={600}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* Welcome Flavor */}
      <section className="flex flex-col md:flex-row gap-8 items-center">
        <Image
          src="/images/image4.png"
          alt="Welcome Flavors"
          width={400}
          height={300}
          className="rounded-xl"
        />
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Welcome every flavor</h3>
          <p>Join us on a culinary journey through Ethiopia: try our tibs, burgers, and more today!</p>
          <Button>Get the food</Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <div className='flex flex-col lg:flex-row justify-between gap-8 items-start'>
            <div className='w-full lg:w-1/2'>
                <Image
                src="/images/image5.png"
                alt="How It Works"
                width={600}
                height={400}
                className="rounded-xl w-full h-auto"
                />
            </div>
            <div>
                <h3 className="text-2xl font-bold">Easy steps to use the service</h3>
                {[
                {
                    step: "Register and Login",
                    desc: "First, create an account in the app and login.",
                    img: "/images/smalliconimage.png"
                },
                {
                    step: "Pick your Food",
                    desc: "Choose among various categories depending on your taste and mood.",
                    img: "/images/smalliconimage.png"
                },
                {
                    step: "Add your address",
                    desc: "Add your delivery address whether it&apos;s home or work.",
                    img: "/images/smalliconimage.png"
                },
                {
                    step: "Payment for food",
                    desc: "Add to your cart, then pay securely.",
                    img: "/images/smalliconimage.png"
                }
                ].map((step, i) => (
                <div key={i} className="flex items-start gap-6 mt-2">
                    <Image src={step.img} alt={step.step} width={60} height={60} />
                    <div className=''>
                        <h4 className="font-semibold">{step.step}</h4>
                        <p>{step.desc}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 space-y-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="space-y-4 w-full lg:w-1/2">
            <h3 className="text-lg uppercase tracking-widest text-muted-foreground">Contact Us</h3>
            <h2 className="text-2xl font-bold">Let&apos;s get in touch</h2>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Your name" />
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
              <Label>Message</Label>
              <Textarea placeholder="Your message here" />
              <Button>Send</Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Image src="/images/image6.png" alt="Contact" width={500} height={400} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">For more information</h3>
            <p>Reach out to our customer service team, we&apos;ll be in touch shortly.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Get to Know Us</h4>
            <Button variant="link">Be a Partner</Button>
            <Button variant="link">Restaurant</Button>
            <Button variant="link">LinkedIn</Button>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Let Us Help You</h4>
            <Button variant="link">Account Details</Button>
            <Button variant="link">Help</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Atglance;
