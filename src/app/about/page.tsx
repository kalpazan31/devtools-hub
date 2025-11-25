"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/Card";
import { tools } from "@/lib/tools";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t.about} DevTools Hub
          </h1>
          <p className="text-xl text-gray-400">
            {t.siteDescription}
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Hızlı ve Güvenli
                  </h3>
                  <p className="text-gray-400">
                    Tüm araçlar tarayıcınızda çalışır. Verileriniz sunucuya gönderilmez,
                    tamamen güvenli ve hızlıdır.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                  💯
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    %100 Ücretsiz
                  </h3>
                  <p className="text-gray-400">
                    Tüm araçlar tamamen ücretsizdir. Kayıt veya ödeme gerektirmez.
                    İstediğiniz kadar kullanabilirsiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Çoklu Dil Desteği
                  </h3>
                  <p className="text-gray-400">
                    Türkçe ve İngilizce dil desteği ile kullanımı kolay arayüz.
                    Dilediğiniz zaman dil değiştirebilirsiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Mobil Uyumlu
                  </h3>
                  <p className="text-gray-400">
                    Responsive tasarım ile tüm cihazlarda mükemmel görünüm.
                    Telefon, tablet veya bilgisayardan erişin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools List */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t.allTools} ({tools.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tools.map((tool) => {
                const toolT = t.tools[tool.id as keyof typeof t.tools];
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white font-bold`}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{toolT?.name || tool.name}</p>
                      <p className="text-sm text-gray-500">{toolT?.description || tool.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="mt-12 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} DevTools Hub. {t.footer.rights}
          </p>
          <p className="mt-2">
            {t.footer.madeWith} ❤️ {t.footer.forDevelopers}
          </p>
        </div>
      </div>
    </div>
  );
}
