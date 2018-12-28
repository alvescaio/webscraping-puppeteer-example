const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.pt-br.html?aid=376377&label=booking-name-pt-row-bwMffLz*fdB8PTKNsC9tlgS267778091920%3Apl%3Ata%3Ap1%3Ap22%2C180%2C000%3Aac%3Aap1t1%3Aneg%3Afi%3Atikwd-65526620%3Alp1001661%3Ali%3Adec%3Adm&sid=b2f4f7001eb21969928a2ca551895a85&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-br.html%3Faid%3D376377%3Blabel%3Dbooking-name-pt-row-bwMffLz%252AfdB8PTKNsC9tlgS267778091920%253Apl%253Ata%253Ap1%253Ap22%252C180%252C000%253Aac%253Aap1t1%253Aneg%253Afi%253Atikwd-65526620%253Alp1001661%253Ali%253Adec%253Adm%3Bsid%3Db2f4f7001eb21969928a2ca551895a85%3Bcheckin_month%3D12%3Bcheckin_monthday%3D30%3Bcheckin_year%3D2018%3Bcheckout_month%3D1%3Bcheckout_monthday%3D4%3Bcheckout_year%3D2019%3Bcity%3D20023181%3Bclass_interval%3D1%3Bdest_id%3D20023181%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D1%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dsearchresults%3Bsrc_elem%3Dsb%3Bsrpvid%3D34925189d9820019%3Bss%3DMiami%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3DMiami%3Bssne_untouched%3DMiami%26%3B&ss=Foz+do+Igua%C3%A7u%2C+Paran%C3%A1%2C+Brasil&is_ski_area=&ssne=Miami&ssne_untouched=Miami&city=20023181&checkin_monthday=18&checkin_month=2&checkin_year=2019&checkout_monthday=19&checkout_month=2&checkout_year=2019&group_adults=1&group_children=0&no_rooms=1&from_sf=1&ss_raw=Foz+do+igua&ac_position=0&ac_langcode=xb&ac_click_type=b&dest_id=-643720&dest_type=city&iata=IGU&place_id_lat=-25.542566&place_id_lon=-54.584709&search_pageview_id=34925189d9820019&search_selected=true&search_pageview_id=34925189d9820019&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if(hotelelement.querySelector('strong.price')){
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception){

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})();