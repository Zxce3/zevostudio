import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const url = 'https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=zevostudio_';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
};

export async function fetchInstagramPosts() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();  // Parse the response as JSON
        
        const postCodes = result.data.items.map(item => item.code);

        const jsonData = `export let byCode: string[] = ${JSON.stringify(postCodes, null, 2)};\n\nexport const igposts = byCode.map(code => code);`;
        
        fs.writeFile('src/data/instagram.json.ts', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Instagram post codes saved to src/data/instagram.json.ts');
            }
        });

    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
    }
}

fetchInstagramPosts();