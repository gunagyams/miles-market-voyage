import React from "react";

export default function ThreeStepProcess() {
  return (
    <div className="bg-[#fefbf3] mt-[-30px] w-[80%] py-12 px-6 text-center text-[#0e1e3c] relative z-10 mx-auto ">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div>
          <h3 className="text-xl font-medium text-[#b49b4c] mb-1">Step 1</h3>
          <h2 className="text-2xl font-semibold mb-4">Choose an Airline</h2>
          <div className="flex justify-center mb-4">
            <svg
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 8.94737L22 14V16L14 13.4737V18.8333L17 20.5V22L12.5 21L8 22V20.5L11 18.8333V13.4737L3 16V14L11 8.94737V3.5C11 2.67157 11.6716 2 12.5 2C13.3284 2 14 2.67157 14 3.5V8.94737Z"></path>
            </svg>
          </div>
          <p className="text-base">Select from a range of airlines</p>
        </div>
        {/* Step 2 */}
        <div>
          <h3 className="text-xl font-medium text-[#b49b4c] mb-1">Step 2</h3>
          <h2 className="text-2xl font-semibold mb-4">Calculate Miles</h2>
          <div className="flex justify-center mb-4">
            <svg
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2ZM7 12V14H9V12H7ZM7 16V18H9V16H7ZM11 12V14H13V12H11ZM11 16V18H13V16H11ZM15 12V18H17V12H15ZM7 6V10H17V6H7Z"></path>
            </svg>
          </div>
          <p className="text-base">Use the slider to select miles</p>
        </div>

        {/* Step 3 */}
        <div>
          <h3 className="text-xl font-medium text-[#b49b4c] mb-1">Step 3</h3>
          <h2 className="text-2xl font-semibold mb-4">Place Order</h2>
          <div className="flex justify-center mb-4">
            <svg
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM12.0049 20.0027C16.4232 20.0027 20.0049 16.421 20.0049 12.0027C20.0049 7.58447 16.4232 4.00275 12.0049 4.00275C7.5866 4.00275 4.00488 7.58447 4.00488 12.0027C4.00488 16.421 7.5866 20.0027 12.0049 20.0027ZM8.50488 14.0027H14.0049C14.281 14.0027 14.5049 13.7789 14.5049 13.5027C14.5049 13.2266 14.281 13.0027 14.0049 13.0027H10.0049C8.62417 13.0027 7.50488 11.8835 7.50488 10.5027C7.50488 9.12203 8.62417 8.00275 10.0049 8.00275H11.0049V6.00275H13.0049V8.00275H15.5049V10.0027H10.0049C9.72874 10.0027 9.50488 10.2266 9.50488 10.5027C9.50488 10.7789 9.72874 11.0027 10.0049 11.0027H14.0049C15.3856 11.0027 16.5049 12.122 16.5049 13.5027C16.5049 14.8835 15.3856 16.0027 14.0049 16.0027H13.0049V18.0027H11.0049V16.0027H8.50488V14.0027Z"></path>
            </svg>
          </div>
          <p className="text-base">Enter your details to submit</p>
        </div>
      </div>
    </div>
  );
}
