import React from "react";

export default function LoginPage() {
return (
    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center mx-auto">
      {/* LEFT SECTION */}
      <div className="hidden lg:block space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl font-['Pacifico']">G</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-['Pacifico']">TELECRM</h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
          </div>

          {/* New Content Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Power Your Sales. Simplify Your Workflow.</h2>
          <p className="text-lg text-gray-700 mt-4">
            Log in to access your all‑in‑one CRM platform built for teams that move fast.
          </p>

          <div className="space-y-4 mt-6">
            <ul className="list-disc list-inside text-gray-600">
              <li>Manage leads, calls, and tasks — all in one place.</li>
              <li>Automate your sales process and follow‑ups.</li>
              <li>Get real‑time insights and performance metrics.</li>
              <li>Access securely from anywhere, on any device.</li>
            </ul>
          </div>

          <p className="text-lg text-gray-700 mt-6">
            Enter your credentials below to get back to making every lead count.
          </p>
        </div>

        {/* Platform Statistics Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,500+</div>
              <div className="text-sm text-gray-600">Active Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">15,000+</div>
              <div className="text-sm text-gray-600">GMB Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT (LOGIN BOX) */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-['Pacifico']">G</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 font-['Pacifico']">GMB Pro</h1>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your admin dashboard</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-300"
                  placeholder="admin@gmbpro.com"
                  name="email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <i className="ri-mail-line text-gray-400"></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12 border-gray-300"
                  placeholder="Enter your password"
                  name="password"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <i className="ri-eye-line text-gray-400 hover:text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me for 30 days</label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <i className="ri-login-circle-line"></i>
              <span>Sign In</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-google-fill text-red-500 mr-2"></i>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-microsoft-fill text-blue-500 mr-2"></i>
                <span className="text-sm font-medium text-gray-700">Microsoft</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors" href="#">
              Forgot your password?
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">Protected by enterprise-grade security</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <i className="ri-shield-check-line text-green-500"></i>
                <span className="text-xs text-gray-600">SSL Encrypted</span>
              </div>

              <div className="flex items-center space-x-1">
                <i className="ri-lock-line text-blue-500"></i>
                <span className="text-xs text-gray-600">2FA Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact <a className="text-blue-600 hover:text-blue-700 font-medium" href="#">support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
