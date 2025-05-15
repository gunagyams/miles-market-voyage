import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy font-gilda">
              About <span className="text-gold">Cash My Points</span>
            </h2>
            <p className="text-gray-600">
              We're revolutionizing the way travelers access premium flight
              experiences through ethical miles acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-navy font-gilda">
                Our Story
              </h3>
              <p className="text-gray-600 mb-6">
                Cash My Points was founded in Dubai with a simple mission: to
                make luxury travel accessible to more people through innovative
                solutions. We saw a gap in the market where travelers were
                paying full price for premium flights, unaware that there was a
                more affordable way.
              </p>
              <p className="text-gray-600">
                Our team of travel industry experts has deep relationships with
                airlines and partners across the globe, allowing us to source
                miles ethically and pass the savings directly to you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-navy font-gilda">
                Our Values
              </h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">
                      Trust & Security
                    </h4>
                    <p className="text-gray-600">
                      Your miles and personal information are handled with the
                      utmost care and security.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">
                      Efficiency
                    </h4>
                    <p className="text-gray-600">
                      Quick delivery of miles and a streamlined process to get
                      you flying sooner.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">Value</h4>
                    <p className="text-gray-600">
                      Competitive rates that provide significant savings
                      compared to retail prices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center m-5">
            <img
              src="https://images.unsplash.com/photo-1612832164313-ac0d7e07b5ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Halal Compliance"
              className="w-full h-auto"
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-2 text-navy font-gilda">
              Halal-Compliant Business
            </h3>
            <p className="text-gray-600">
              Cash My Points operates in full compliance with Islamic financial
              principles. Our business model avoids interest-based transactions
              and ensures transparency in all our dealings. We take pride in
              providing a service that respects and adheres to the values of our
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
