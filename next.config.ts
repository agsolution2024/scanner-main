import createNextJsObfuscator from "nextjs-obfuscator";
import { NextConfig } from "next";

const withNextJsObfuscator = createNextJsObfuscator(
    {
        compact: true,
        controlFlowFlattening: true,
        stringArrayEncoding: ["rc4"],
        stringArrayThreshold: 0.75,
        deadCodeInjection: true,
        disableConsoleOutput: true,
        selfDefending: true,
        numbersToExpressions: true,
        reactStrictMode: true,
        debugProtection: true,
        swcMinify: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 3,
        debugProtectionInterval: 4000,
        transformObjectKeys: true,
        unicodeEscapeSequence: true,
        controlFlowFlatteningThreshold: 0.8,
        deadCodeInjectionThreshold: 0.4,
    },
    {
        enabled: "detect",
        patterns: [
            "./app/src/**/*.(js|jsx|ts|tsx)",
            "./.next/static/chunks/**/*.js"
        ],
        obfuscateFiles: {
            buildManifest: true,
            ssgManifest: true,
            webpack: true,
            additionalModules: ["./.next/static/chunks/app/**/*.js"],
        },
        log: false,
    }
);

/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = withNextJsObfuscator({
    productionBrowserSourceMaps: false,
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: process.env.NEXT_PUBLIC_API_URL || "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                ],
            },
            {
                source: "/(.*)",
                headers: [
                    { key: "Permissions-Policy", value: "camera=*, microphone=*, geolocation=*" },
                    { key: "Feature-Policy", value: "camera *; microphone *; geolocation *" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                ],
            },
        ];
    },
    env: {
       // env variables
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        API_HELLO: process.env.API_HELLO,
    },
});

export default nextConfig;