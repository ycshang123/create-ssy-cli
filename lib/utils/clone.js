/*
 * @Author: ycshang
 * @Date: 2023-01-16 19:03:05
 * @LastEditors: ycshang
 * @LastEditTime: 2023-01-16 19:03:15
 */
import { promisify } from "util"
import download from "download-git-repo"
import ora from "ora"
export default async (repo, desc) => {
    const process = ora(`开始下载模版...${repo}`)
    process.start()
    await promisify(download)(repo, desc)
    process.succeed()
}