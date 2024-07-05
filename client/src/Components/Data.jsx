import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Data({ state }) {
    const { contract } = state;
    const { account } = state;
    const [pub, setPub] = useState([]);
    const [pvt, setPvt] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (contract) {
                try {
                    const pu = await contract.showAll();
                    setPub(pu);
                    const pr = await contract.showMe();
                    setPvt(pr);
                } catch (e) {
                    console.error("Error fetching data:", e);
                }
            }
        };
        fetchData();
    }, [account]);

    const handlePublicClick = () => {
        setModalType("public");
        setShowModal(true);
    };

    const handlePrivateClick = () => {
        setModalType("private");
        setShowModal(true);
    };

    const DeleteFromPrivate = async (txHash) => {
        try {
            await contract.DeletePrivate(txHash);

            setTimeout(() => {
                window.location.reload();
            }, 15000);
        } catch (e) {
            console.error("Error deleting todo:", e);
        }
    };

    const handleSubmit = async () => {
        try {
            if (modalType === "public") {
                const value = { value: ethers.utils.parseEther("0.0002") };
                await contract.PublicAdd(title, description, value);
            } else {
                await contract.PrivateAdd(title, description);
            }

            setShowModal(false);
            setTitle("");
            setDescription("");
            setTimeout(() => {
                window.location.reload();
            }, 15000);


        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                minHeight: "60vh",
                marginBottom: "20px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: "1",
                    marginRight: "20px",
                    padding: "20px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}>
                    <h3 style={{
                        marginBottom: "10px",
                        color: "#333"
                    }}>
                        Public
                    </h3>
                    {pub.map((todo, index) => (
                        <div key={index} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}>
                            <div style={{
                                fontWeight: "bold",
                                marginRight: "10px"
                            }}>
                                {todo.title}
                            </div>
                            <div>
                                {todo.desc}
                            </div>
                        </div>
                    ))}
                    <div style={{
                        display: "flex",
                        justifyContent: "centre",
                        marginTop: "auto"
                    }}>
                        <button style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease"
                        }} onClick={handlePublicClick}>
                            Add
                        </button>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: "1",
                    padding: "20px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}>
                    <h3 style={{
                        marginBottom: "10px",
                        color: "#333"
                    }}>
                        Private
                    </h3>
                    {pvt.map((todo, index) => (
                        <div key={index} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "10px"
                            }}>
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => DeleteFromPrivate(todo.txHash)}
                                    style={{
                                        marginRight: "5px"
                                    }}
                                />
                                <div style={{
                                    fontWeight: "bold"
                                }}>
                                    {todo.title}
                                </div>
                            </div>
                            <div>
                                {todo.desc}
                            </div>
                        </div>
                    ))}
                    <div style={{
                        display: "flex",
                        justifyContent: "centre",
                        marginTop: "auto"
                    }}>
                        <button style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease"
                        }} onClick={handlePrivateClick}>
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}>
                        <h3 style={{
                            marginBottom: "10px",
                            color: "#333"
                        }}>
                            Add Todo
                        </h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                        />
                        <button
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease"
                            }}
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}