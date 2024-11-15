import esbuildPluginTsc from 'esbuild-plugin-tsc';

export function createBuildSettings(options) {
    return {
        entryPoints: ['client/*.ts'],
        outdir: 'dist',
        platform: 'browser',
        format: 'esm',
        external: ['module', 'node:crypto'], // Exclure les modules spécifiques à Node.js
        bundle: true,
        plugins: [
            esbuildPluginTsc({
                force: true
            }),
        ],
        ...options
    };
}