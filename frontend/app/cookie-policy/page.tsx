export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">What are cookies?</h2>
          <p>Cookies are simple text files that are stored on your computer or mobile device by a website's server. Each cookie is unique to your web browser. It will contain some anonymous information such as a unique identifier, website's domain name, and some digits and numbers.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">What types of cookies do we use?</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800">Necessary cookies</h3>
          <p>Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800">Functionality cookies</h3>
          <p>Functionality cookies let us operate the site in accordance with the choices you make. For example, we will recognize your username and remember how you customized the site during future visits.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800">Analytical cookies</h3>
          <p>These cookies enable us and third-party services to collect aggregated data for statistical purposes on how our visitors use the website. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the website.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">How to delete cookies?</h2>
          <p>If you want to restrict or block the cookies that are set by our website, you can do so through your browser setting. Alternatively, you can visit www.internetcookies.org, which contains comprehensive information on how to do this on a wide variety of browsers and devices. You will find general information about cookies and details on how to delete cookies from your device.</p>
        </section>
      </div>
    </div>
  );
}
