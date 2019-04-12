try {
    console.log("Hello World in Nodejs !!");
} catch(e) {
    print("Hello World in Java !!");
}

/**
 * 控制台输入输出
 */
process.stdin.on('data', data => {
    process.stdout.write(data);
});
