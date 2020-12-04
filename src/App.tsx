import React, { useEffect, useState } from "react";

import "./App.css";

const VERSION = "16.40";

const HEALTH_CHECK_URL = `https://dev.postapay.org/walletwidget/api/health-check/`;
const SERVICE_WORKER_URL = `${process.env.PUBLIC_URL}/service-worker.js`;

const currentDomain = "https://www.rostovcasino.com/lotoru/dev/";
const newDomain = "https://dev.postapay.org/walletwidget/postapay.html?lang=ru&route=deposit_marbella_wallet&token=demo-token-001";

export const App = () => {
    const [widgetUrl, setWidgetUrl] = useState("");
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        healthCheck()
            .then(() => {
                checkDomain()
                    .then(() => setWidgetUrl(currentDomain))
                    .catch(() => setWidgetUrl(newDomain))
                    .finally(() => {
                        setTimeout(() => {
                            document.getElementById("html-spinner")?.remove();
                        }, 1000);
                    });
            })
            .catch(() => {
                setIsOffline(true);
                document.getElementById("html-spinner")?.remove();

                window.addEventListener("online", () => {
                    window.location.reload();
                });
            })
        ;
    }, [widgetUrl]);

    if (widgetUrl) {
        return (
            <div className="App-container">
                <iframe
                    key={"Content"}
                    title={"Content"}
                    className="App-iframe"
                    src={widgetUrl}
                />
            </div>
        );
    }

    if (isOffline) {
        return (
            <div className="App-version">
                ver {VERSION} (OFFLINE MODE)
            </div>
        );
    }

    return (
        <div className="App-version">
            ver {VERSION}
        </div>
    );
};

export const healthCheck = async (): Promise<void> => new Promise((resolve, reject) => {
    fetch(HEALTH_CHECK_URL, {
        mode: "no-cors"
    })
        .then((response) => {
            console.log("App is running in online mode.");
            resolve();
        })
        .catch(() => {
            console.log("No internet connection found. App is running in offline mode.");
            reject();
        });
});

export const checkDomain = async (): Promise<void> => new Promise((resolve, reject) => {

    fetch(SERVICE_WORKER_URL, {
        headers: { "Service-Worker": "script" },
    })
        .then((response) => {
            console.log("App is running in online mode.");
            resolve();
        })
        .catch(() => {
            console.log("No internet connection found. App is running in offline mode.");
            reject();
        });

});
