import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="bg-[#FFF4E0] text-[#111111]">

            {/* HERO */}
            <section className="px-6 md:px-16 py-20 md:py-28">

                <div className="max-w-6xl mx-auto">

                    <div className="inline-block bg-[#FFD23F] border-2 border-black px-4 py-2 font-bold rotate-[-3deg] mb-8">
                        ✦ THE INNOVATION STARTS HERE
                    </div>

                    <h1 className="display-font text-5xl md:text-8xl leading-[1.05]">
                        DON'T JUST
                        <br />
                        <span className="text-[#FF5C39]">THINK IT.</span>
                        <br />
                        BUILD IT.
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 gap-8">

                        <p className="text-lg md:text-xl max-w-xl font-medium">
                            Ideas are everywhere. Execution is everything.
                            Bring your creativity, build something extraordinary
                            and turn your imagination into innovation.
                        </p>

                        <Link
                            to="/signup"
                            className="brutal-button bg-[#3DDC97] px-8 py-4 text-xl font-bold"
                        >
                            Join the Hackathon ↗
                        </Link>

                    </div>

                    <div className="mt-20 bg-[#FF5C39] border-[3px] border-black p-8 md:p-12 brutal-shadow">

                        <div className="flex flex-col md:flex-row justify-between gap-8 items-center">

                            <h2 className="display-font text-4xl md:text-6xl">
                                IDEAS HAVE
                                <br /> NO LIMITS.
                            </h2>

                            <div className="bg-[#FFD23F] border-[3px] border-black p-6 rotate-3">
                                <p className="font-bold text-2xl">CREATE.</p>
                                <p className="font-bold text-2xl">COLLABORATE.</p>
                                <p className="font-bold text-2xl">CONQUER.</p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="section-padding bg-white border-y-[3px] border-black">

                <div className="max-w-6xl mx-auto">

                    <p className="font-bold text-[#FF5C39] mb-4">01 / ABOUT US</p>

                    <h2 className="display-font text-4xl md:text-6xl mb-8">
                        MORE THAN JUST
                        <span className="text-[#FF5C39]"> A HACKATHON.</span>
                    </h2>

                    <p className="text-xl max-w-3xl leading-relaxed">
                        Code-A-Nova is a space where curious minds come together
                        to experiment, collaborate and transform bold ideas into
                        meaningful solutions. Bring your team, challenge yourself
                        and make something that matters.
                    </p>

                </div>
            </section>

            {/* DOMAINS */}
            <section className="section-padding">

                <div className="max-w-6xl mx-auto">

                    <p className="font-bold text-[#FF5C39] mb-4">02 / EXPLORE</p>

                    <h2 className="display-font text-4xl md:text-6xl mb-12">
                        PICK YOUR PLAYGROUND.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            { title: 'WEB DEVELOPMENT', color: '#FF5C39', number: '01' },
                            { title: 'ARTIFICIAL INTELLIGENCE', color: '#FFD23F', number: '02' },
                            { title: 'CYBER SECURITY', color: '#3DDC97', number: '03' }
                        ].map(domain => (

                            <div
                                key={domain.number}
                                style={{ backgroundColor: domain.color }}
                                className="brutal-card p-8 min-h-64 flex flex-col justify-between hover:-translate-y-2 transition"
                            >
                                <span className="text-5xl display-font">
                                    {domain.number}
                                </span>

                                <h3 className="display-font text-3xl">
                                    {domain.title}
                                </h3>

                            </div>

                        ))}

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#FFD23F] border-y-[3px] border-black section-padding text-center">

                <h2 className="display-font text-4xl md:text-6xl">
                    YOUR IDEA DESERVES A STAGE.
                </h2>

                <p className="text-lg mt-5 mb-8">
                    Stop waiting for the perfect moment. Start building.
                </p>

                <Link
                    to="/signup"
                    className="brutal-button inline-block bg-[#FF5C39] px-8 py-4 font-bold text-xl"
                >
                    Get Started ↗
                </Link>

            </section>

        </div>
    );
}

export default Home;