// jshint esversion:6
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const reportDir = path.join(__dirname, 'reports');

const controller = {
  getAll: (req, res) => {
    fs.readdir(reportDir, (err, files) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        Promise.all(files.map(file => {
          var id = path.basename(file, '.csv');
          return new Promise((resolve, reject) => {
            fs.readFile(path.join(reportDir, file), (err1, text) => {
              if (err1) {
                console.log(err1);
                reject(err1);
              } else {
                resolve({id, text: text.toString()});
              }
            });
          });
        })).then(values => res.status(200).send(values))
            .catch(err2 => res.status(404).send(err2));

      }
    });
  },

  getOne: (req, res) => {
    console.log(req.params.id);
    var file = req.params.id + '.csv';
    fs.readFile(path.join(reportDir, file), (err3, text) => {
      if (err3) {
        console.log(err3);
        res.status(404).send(err3);
      } else {
        res.download(path.join(reportDir, file), file);
      }
    });
  },

  create: (req, res) => {
    console.log(req.body);
    console.log(JSON.parse(req.body.jsondata));
    var json = JSON.parse(req.body.jsondata);
    var id = req.body.id;
    fs.readdir(reportDir, (err, files) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        if (files.length < 1) {
          id = String(0);
        } else {
          id = String(files.length);
        }
        var text = '';
        for (let i = 0; i < Object.keys(json).length; i++) {
          if (!Array.isArray(Object.keys(json)[i])) {
            text += Object.keys(json)[i];
            text += ' ';
          }
        }
        text += '\n';
        text += addToText(json);

        fs.writeFile(path.join(reportDir, id + '.csv'), text, (err1) => {
          if (err1) {
            console.log(err1);
            res.status(404).send(err1);
          } else {
            res.status(201).send();
            // res.status(201).send(text);
          }
        });
      }
    });

  }
};

module.exports = controller;

const addToText = (jsonObj) => {
  let toAppend = '';
  for (let i in jsonObj) {
    if (i !== 'children') {
      toAppend += jsonObj[i];
      toAppend += ' ';
    }
  }
  toAppend += '\n';
  if (jsonObj.children) {
    for (let j = 0; j < jsonObj.children.length; j++) {
      toAppend += addToText(jsonObj.children[j]);
      // toAppend += '\n';
    }
  }
  return toAppend;
};