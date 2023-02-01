// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
    fetch("https://api.spacexdata.com/v5/launches", {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => {
            const filteredResult = JSON.parse(result);
            res.status(200).json(filteredResult.slice(0,10));
        })
        .catch(error => {
            res.status(400).json({ error: '400 Bad Request', status_code: 400 });
        });
}
