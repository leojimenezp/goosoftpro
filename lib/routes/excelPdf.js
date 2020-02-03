const express = require('express');
const fs = require('fs');
const router = express.Router();
const conversionFactory = require('html-to-xlsx');
const puppeteer = require('puppeteer');
const chromeEval = require('chrome-page-eval')({ puppeteer });

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.post('/excel', (req, res) => {
    try {
        const { html, name } = req.body;
        const conversion = conversionFactory({ extract: chromeEval });
        async function run() {
            const stream = await conversion(html);
            stream.pipe(fs.createWriteStream('/public/output.xlsx'));
        }
        run();
        res.json({ resp: "ok" });
    } catch (e) {
        res.json({ resp: "err: " + e });
    }
});

module.exports = router;