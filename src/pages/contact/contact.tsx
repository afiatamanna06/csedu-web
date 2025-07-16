export default function Contact() {
  return (
    <div className="py-12">
      <div className="py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#13274C] mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6 ml-4 md:ml-12">
            We'd love to hear from you! Please use the form below to get in touch with the Department 
            of Computer Science and Engineering at University X.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="ml-4 md:ml-12">
            <h3 className="text-xl font-semibold text-[#13274C] mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13274C]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13274C]"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-[#13274C] text-white px-6 py-3 rounded-md hover:bg-[#ECB31D] hover:text-black transition duration-300"
              >
                Send Message
              </button>
            </form>
          </section>
          
          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium text-blue-800 mb-2">Address</h4>
                <p className="text-gray-700">
                  Department of Computer Science and Engineering<br />
                  (New Science Complex Building) University of Dhaka<br />
                  Dhaka-1000, Bangladesh
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-blue-800 mb-2">Phone</h4>
                <p className="text-gray-700">
                  +88 09666 911 463 (Ext. 7421)<br />
                  +88 02 226683029
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-blue-800 mb-2">Email</h4>
                <p className="text-gray-700">
                  General Inquiries: office@cse.du.ac.bd<br />
                  Chairman: chairman.cse@du.ac.bd
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-blue-800 mb-2">Website</h4>
                <p className="text-gray-700">
                  <a href="https://www.du.ac.bd/body/CSE" target="_blank">Visit CSEDU Website</a>

                </p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Map Section */}
        <section className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 ml-4 md:ml-12">Find Us</h3>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3701363610934!2d90.39196661498236!3d23.728396984599296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e90a449e4f%3A0xb7092a841c21e398!2sScience%20Complex%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1625123456789!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="CSEDU Location Map"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}