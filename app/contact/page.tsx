import React from 'react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto bg-card p-8 sm:p-12 rounded-xl border border-border shadow-sm">
                <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-foreground">
                    お問い合わせ
                </h1>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                    当サイトに関するご質問、ご意見、お仕事のご依頼などは、以下のフォームよりお気軽にお問い合わせください。通常、数日以内にご返信いたします。
                </p>

                {/* Netlify Formsに対応したフォーム */}
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    className="space-y-6"
                >
                    {/* Netlify Formsに必要な隠しフィールド */}
                    <input type="hidden" name="form-name" value="contact" />

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                            お名前
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="山田 太郎"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="example@mail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                            メッセージ内容
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="こちらにお問い合わせ内容を入力してください"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md hover:opacity-90 transition-opacity shadow-sm"
                    >
                        送信する
                    </button>
                </form>
            </div>
        </main>
    );
}