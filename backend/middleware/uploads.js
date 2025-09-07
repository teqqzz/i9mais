    import fs from 'node:fs'
    import path from 'node:path'
    import multer from 'multer'

// Configuração do multer para upload de arquivos
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync('public/uploads')) {
                fs.mkdir('public/uploads', (err) => {
                    return err?.message
                })
            }
            cb(null, 'public/uploads/')
        },
        filename: (req, file, cb) => {
            cb(
                null,
                Date.now() +
                Math.round(Math.random() * 1e9) +
                path.extname(file.originalname),
            )
        },
    })
    const upload = multer({ storage })

    export default upload