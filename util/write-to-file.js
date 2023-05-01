const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '..', 'data.json'),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.log(err);
  }
};
