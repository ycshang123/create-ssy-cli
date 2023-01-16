/*
 * @Author: ycshang
 * @Date: 2023-01-16 19:03:55
 * @LastEditors: ycshang
 * @LastEditTime: 2023-01-16 19:04:20
 */
import clone from "../utils/clone.js"
import inquirer from "inquirer"
import fs from "fs"

import chalk from "chalk"
const log = (...args) => console.log(chalk.green(...args))

import handlebars from "handlebars"

export default async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input" /* 选择框 */,
            message: "请输入项目的名称？",
            name: "name",
        },
    ])

    log("🚌 创建项目:" + name)

    // 从github克隆项目到指定文件夹
    await clone("github:ycshang123/ssy-ui-template", name)

    // 生成路由定义
    compile(
        {
            name,
        },
        `./${name}/package.json`,
        `./${name}/template/package.hbs.json`
    )

    log(`
👌 安装完成：
get Started:
===========================
cd ${name}
pnpm i
pnpm run dev
===========================
    `)
}


/**
 * 编译模板文件
 * @param meta 数据定义
 * @param filePath 目标文件路径
 * @param templatePath 模板文件路径
 */
function compile (meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(filePath, result)
        log(`📚 ${filePath} 修改成功`)
    } else {
        log(`❌ ${filePath} 修改失败`)
    }
}