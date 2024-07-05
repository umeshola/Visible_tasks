const { ethers } = require("hardhat");

async function main() {
    const todo = await ethers.getContractFactory("Todo");
    const contract = await todo.deploy(); // object of contract
    await contract.deploymentTransaction().wait(2);
    console.log("Address of the contract:", contract.target);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});