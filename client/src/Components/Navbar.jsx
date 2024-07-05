import React from 'react'

export default function Navbar({ state }) {
    const { contract } = state;
    const handleWithdraw = async () => {
        try {
            await contract.withdraw();
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 200px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
            <div style={{
                fontSize: "25px",
                fontWeight: "bold"
            }}>
                ToDo
            </div>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <div style={{
                    marginRight: "10px",
                    color: "blue",
                    fontWeight: "bold"
                }}>
                    Account_
                </div>
                <div style={{
                    color: "#333",
                    fontWeight: "bold"
                }}>
                    {state.account ? state.account : "Not connected"}
                </div>
                <button
                    onClick={handleWithdraw}
                    style={{
                        marginLeft: "20px",
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Withdraw
                </button>
            </div>
        </nav>
    )
}