const { ethers } = require("hardhat");

async function getBalances(address) {
    const balance = await hre.ethers.provider.getBalance(address);
    return ethers.formatEther(balance);
}

async function consoleBalance(addresses) {
    let counter = 0;
    for (const address of addresses) {
        console.log(`Address ${counter} balance:`, await getBalances(address));
        counter++;
    }
}
async function main() {
    const [owner, user1, user2] = await ethers.getSigners();
    const todo = await ethers.getContractFactory("Todo");
    console.log("Deploying contract...")
    const contract = await todo.deploy();
    await contract.deploymentTransaction().wait(1);
    console.log("Contract deployed at:", contract.target);

    const addresses = [owner.address, user1.address, user2.address];
    console.log("Before Adding todo");
    await consoleBalance(addresses);

    // const amount = { value: ethers.parseEther("2") };
    console.log("Adding todo's")
        // await contract.connect(owner).PublicAdd("Study", "follow the time table", amount);
        // await contract.connect(user1).PrivateAdd("Fucking", "a whore");
        // await contract.connect(user1).PrivateAdd("Money", "gambling");
        // await contract.connect(user1).PublicAdd("Drinking", "wine", amount);
        // await contract.connect(user2).PublicAdd("Drinking", "water", amount);
        // await contract.connect(user2).PublicAdd("Drinking", "shake", amount);
        // await contract.connect(user2).PublicAdd("Drinking", "milk", amount);
    await contract.connect(owner).withdraw();
    console.log("after adding todo");
    await consoleBalance(addresses);

    // console.log("public todo");
    // const data1 = await contract.connect(owner).showAll();
    // console.log(data1);
    // console.log("owner");
    // const data3 = await contract.connect(owner).showMe();
    // console.log(data3);
    // console.log("user1");
    // const data2 = await contract.connect(user1).showMe();
    // console.log(data2);
    // console.log("user2");
    // const data4 = await contract.connect(user2).showMe();
    // console.log(data4);

    // console.log("deleting a private todo");
    // await contract.connect(user1).DeletePrivate("0xbc5b9b2117d093bb95ac8b939220dc3eb7a038bbc7847d819f37c8c99d7da6cb");
    // console.log("user1");
    // const data5 = await contract.connect(user1).showMe();
    // console.log(data5)
    console.log("Finished.");


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});