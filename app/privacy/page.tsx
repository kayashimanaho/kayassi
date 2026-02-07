import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto bg-card p-8 sm:p-12 rounded-xl border border-border shadow-sm">
                <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-foreground">
                    プライバシーポリシー
                </h1>

                <div className="space-y-10 text-muted-foreground leading-relaxed">
                    {/* 各セクション */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-foreground flex items-center">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            広告の配信について
                        </h2>
                        <p>
                            当サイトでは、第三者配信の広告サービス「Googleアドセンス」を利用しています。
                            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。これによって当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
                            Cookieを無効にする方法やGoogleアドセンスに関する詳細は「
                            <a
                                href="https://policies.google.com/technologies/ads?hl=ja"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                            >
                                広告 – ポリシーと規約 – Google
                            </a>
                            」をご覧ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-foreground flex items-center">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            アクセス解析ツールについて
                        </h2>
                        <p>
                            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-foreground flex items-center">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                            個人情報の利用目的
                        </h2>
                        <p>
                            当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-foreground flex items-center">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                            免責事項
                        </h2>
                        <p>
                            当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。また、当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-foreground flex items-center">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                            著作権について
                        </h2>
                        <p>
                            当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border mt-12">
                        <div className="bg-muted/50 p-6 rounded-lg text-sm">
                            <h3 className="font-bold mb-2 text-foreground">運営者情報</h3>
                            <p>サイト名：Kayassi</p>
                            <p>URL：<a href="https://kayassi.com" className="hover:text-primary">https://kayassi.com</a></p>
                            <p>制定日：2026年2月8日</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}