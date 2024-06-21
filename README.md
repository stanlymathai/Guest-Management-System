# Guest Management System

Welcome to the Guest Management System repository! This system is designed to efficiently manage guests and visitors for various environments, providing a seamless experience for both hosts and guests.

The Guest Management System is a robust software solution designed to streamline the process of managing guests and visitors across various environments. Whether for corporate offices, events, or hospitality venues, this system provides a comprehensive platform to enhance visitor experience while ensuring efficient administration for hosts.

## Key Features
- **Visitor Registration** : Simplify the registration process for guests before their arrival, capturing necessary details securely.

- **Check-in/Check-out** : Track guest entry and exit times seamlessly, enhancing security and operational efficiency.

- **Visitor Records** : Maintain a centralized database of all visitors, enabling easy access to historical visitor information and trends.

- **Notifications** : Send automated notifications to hosts and guests regarding visit confirmations, reminders, or updates.

- **Reporting** : Generate insightful reports on visitor statistics, including frequency of visits, peak times, and other relevant metrics.

- **Security** : Ensure data security and privacy compliance, with robust measures to protect visitor information.

## How It Works
The system offers an intuitive admin dashboard for managing guest records, configuring settings, and generating reports. Guests access a user-friendly portal for registration, check-in/check-out, and accessing visit details. Notifications keep both hosts and guests informed throughout the visitation process.

## Benefits
Efficiency: Streamline guest management processes to save time and resources.

Enhanced Experience: Improve visitor satisfaction with smooth registration and check-in experiences.

Data Insights: Gain actionable insights from visitor data to optimize operations and resource allocation.

Compliance: Ensure compliance with security and privacy regulations through secure data handling practices.

Getting Started
To get started with the Guest Management System:

* Clone the repository and install dependencies.
* Set up environment variables and configure settings.
* Checkout to the git local branch.
* Configure the local.env file with your local configuration (Your local IP address and ports), The local.env file is situated at backend/config/env/ folder.
* Switch your local nodejs version to 14.18.1 and run npm install command on both frontend and backend folders.
* Change the db volumes path to your local path in docker-compose.local.yaml file.
* Run the docker-compose command to run the app locally,

`command:  docker-compose -f docker-compose.local.yaml up --build --force-recreate`

Start the application and access it through your preferred web browser.


### Notes:
 DB server and Mail server are running on docker containers.

Mail server web interface can access through http://0.0.0.0:1080/ this url.

To run the db migrations  please execute the script file migration-run-local.sh

To send emails in queue please execute the script file mail-queue-local.sh

```
Docker version 20.10.1
Docker compose version 1.25.4
```