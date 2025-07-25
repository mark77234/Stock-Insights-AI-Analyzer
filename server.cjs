//아주 간단하게 구현안 node.js백엔드라 따로 기능은 없습니다.다만 네이버 스튜디오 접근하려면 이거 필요합니다,서버만들어서 우회에서 접근해야함
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Loaded CLOVA_API_KEY:', process.env.CLOVA_API_KEY);

app.post('/api/clova-summary', async (req, res) => {
  try {
    const response = await axios.post(//응답이 여기에 저장됩니다 "response.data"
      'https://clovastudio.stream.ntruss.com/v3/chat-completions/HCX-005',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOVA_API_KEY}`,
          'X-NCP-CLOVASTUDIO-REQUEST-ID': 'demo-' + Date.now(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    res.json(response.data);
    console.log('요약 결과:', response.data?.result?.message?.content);//터미널에서 요약 결과 보실수 있습니다.
  } catch (err) {
    res.status(500).json({ error: err.message, detail: err.response?.data });
  }
});

app.listen(4000, () => {
  console.log('Proxy server running on http://localhost:4000');
}); 