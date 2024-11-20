const generateWelcomeEmail = (userName) => {
  return `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Chào mừng bạn đến với Gooup1</h1>
                    </div>

                    <!-- Body -->
                    <div style="padding: 30px;">
                        <h2 style="color: #333; font-size: 22px; text-align: center; margin-bottom: 20px;">Chào mừng, ${userName}!</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #666;">Xin chào ${userName},</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #666;">Cảm ơn bạn đã đăng ký tài khoản tại Gooup1. Chúng tôi rất vui mừng được chào đón bạn đến với cộng đồng của chúng tôi và hi vọng rằng bạn sẽ có trải nghiệm tuyệt vời.</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #666;">Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng giúp đỡ!</p>
                    </div>

                    <!-- Divider -->
                    <hr style="border: none; border-top: 1px solid #eee; margin: 0 30px;">

                    <!-- Footer -->
                    <div style="padding: 20px; text-align: center; background-color: #f9f9f9;">
                        <p style="font-size: 14px; color: #888; margin-bottom: 0;">Chào mừng bạn đến với Gooup1</p>
                        <p style="font-size: 12px; color: #bbb;">&copy; 2022 Gooup1.</p>
                    </div>
                </div>
            </body>
        </html>

    `;
};

module.exports = {
  generateWelcomeEmail,
};
