import { NextResponse } from 'next/server'

// System Prompt định hướng cho AI hiểu tiếng H'Mông (RPA) và tiếng Việt
const SYSTEM_PROMPT = `Bạn là AI H’Mông - Trợ lý thông minh đa năng dành riêng cho cộng đồng người H’Mông và người dùng Việt Nam.

Nhiệm vụ chính:
1. Trả lời thân thiện, lịch sự, chuẩn xác bằng tiếng Việt hoặc tiếng H’Mông (chữ Quốc ngữ H’Mông - RPA).
2. Dịch thuật chính xác 2 chiều: Tiếng H’Mông (H'Mong Daw / H'Mong Njua) ↔ Tiếng Việt và các ngôn ngữ khác.
3. Hỗ trợ viết kịch bản, giải toán, tư vấn kiến thức tổng hợp.
4. Khi người dùng chào bằng tiếng H'Mông (ví dụ: "Pob tsawg", "Nyob tốt"), hãy đáp lại bằng tiếng H'Mông ấm áp.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Sử dụng OpenAI API (hoặc các mô hình tương thích)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.error?.message || 'Lỗi kết nối AI API' }, { status: 500 })
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || 'Không nhận được phản hồi từ AI.'

    return NextResponse.json({ result: aiMessage })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 })
  }
}
