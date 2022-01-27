import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

interface Info {  
  name: string; 
  url: string;
}

class Crawler {
  private url = "https://www.hanju.run/play/39221-4-0.html";
  constructor() {
    this.initSpider();
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    const html = await result.text;
    return html;
  }
  async initSpider() {
    const html = await this.getRawHtml();
  }
}


const crawler = new Crawler();
