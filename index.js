import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { createAgent } from "@dfinity/utils";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import { Principal } from "@dfinity/principal";
// import { getMetricPayload, pushMetrics, sleepAsync } from "./common.js";

// const COIN_TRANSFER_LATENCY_METRIC_NAME = "e2e_p2p_txn_latency";
// const COIN_TRANSFER_SUCCESS_METRIC_NAME =
//     COIN_TRANSFER_LATENCY_METRIC_NAME + "_success";
// const CHAIN_NAME = process.env.CHAIN_NAME;
// const PING_INTERVAL = process.env.PING_INTERVAL * 1000;

const identity = Secp256k1KeyIdentity.fromSeedPhrase(
    "token token token token token token token token token token token token"
);

const main = async () => {
    const agent = await createAgent({
        identity,
    });

    const { transfer } = IcrcLedgerCanister.create({
        agent,
        canisterId: Principal.fromText("gcop5-qqaaa-aaaal-amr4q-cai"),
    });

    while (true) {
        try {
            const startTime = performance.now();
            const response = await transfer({
                to: {
                    owner: Principal.fromText(
                        "my3yj-owdbd-usocp-tltlm-r577j-hcke5-oqrl5-lrbka-7k5ak-ek6ty-xqe"
                    ),
                    subaccount: [],
                },
                amount: BigInt(1),
            });
            const endTime = performance.now();
            const latency = (endTime - startTime) / 1000;

            // pushMetrics(
            //     getMetricPayload(
            //         COIN_TRANSFER_LATENCY_METRIC_NAME,
            //         { chain_name: CHAIN_NAME },
            //         latency
            //     )
            // );

            // pushMetrics(
            //     getMetricPayload(
            //         COIN_TRANSFER_SUCCESS_METRIC_NAME,
            //         { chain_name: CHAIN_NAME },
            //         1
            //     )
            // );
            console.log(response.toString());
            console.log(latency);
        } catch (e) {
            console.log("Error:", e.message);
            // pushMetrics(
            //     getMetricPayload(
            //         COIN_TRANSFER_SUCCESS_METRIC_NAME,
            //         { chain_name: CHAIN_NAME },
            //         0
            //     )
            // );
        }
        // await sleepAsync(PING_INTERVAL);
    }
};

main();
