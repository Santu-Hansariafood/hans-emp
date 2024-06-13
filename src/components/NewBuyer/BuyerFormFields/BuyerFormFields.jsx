import React from "react";

const BuyerFormFields = ({ formData, handleChange, companies, cities, states }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block">Mobile :</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="password" className="block">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="isFirstLogin" className="block">Is First Login :</label>
          <select
            id="isFirstLogin"
            name="isFirstLogin"
            value={formData.isFirstLogin}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <select
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Company</option>
            {companies &&
              companies.map((company) => (
                <option key={company._id} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="location" className="block">Location :</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="gstNo" className="block">GST No. :</label>
          <input
            type="text"
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="Enter GST No."
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="billingAddress" className="block">Billing Address :</label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Enter Billing Address"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="shippingAddress" className="block">Shipping Address :</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            placeholder="Enter Shipping Address"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="mappedFinancer" className="block">Mapped Financer :</label>
          <input
            type="text"
            id="mappedFinancer"
            name="mappedFinancer"
            value={formData.mappedFinancer}
            onChange={handleChange}
            placeholder="Choose Mapped Financers"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Select State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block">City :</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="panNo" className="block">PAN No. :</label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            placeholder="Enter PAN No."
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="products" className="block">Products :</label>
          <input
            type="text"
            id="products"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="Enter Products"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="bidingLocations" className="block">Bidding Locations :</label>
          <input
            type="text"
            id="bidingLocations"
            name="bidingLocations"
            value={formData.bidingLocations}
            onChange={handleChange}
            placeholder="Enter Bidding Locations"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="cityOrigins" className="block">City Origins :</label>
          <input
            type="text"
            id="cityOrigins"
            name="cityOrigins"
            value={formData.cityOrigins}
            onChange={handleChange}
            placeholder="Enter City Origins"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="otherCompanies" className="block">Other Companies :</label>
          <input
            type="text"
            id="otherCompanies"
            name="otherCompanies"
            value={formData.otherCompanies}
            onChange={handleChange}
            placeholder="Enter Other Companies"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerFormFields;
