const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.YOUR_API_KEY,
  server: process.env.YOUR_SERVER_PREFIX,
});

exports.createNews = async(req, res, next) => { 
    
  const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
      email_address: `${req.body.email_address}`,
      status: "subscribed",
  })
  res.status(200).json(response)
}

// async function run() {
//   const response = await mailchimp.lists.getAllLists();
//   console.log(response);
// }

// run();