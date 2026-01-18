<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Studiofy - AI Marketing Asset Generator

<p align="center">
    <img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js">
    <img src="https://img.shields.io/badge/Framework-NestJS-red" alt="NestJS">
    <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB">
    <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue" alt="Gemini AI">
    <img src="https://img.shields.io/badge/Storage-Google%20Cloud-yellow" alt="GCS">
</p>

## 🚀 Description

**Studiofy** is a SaaS backend engine designed to transform raw product photography into professional marketing assets using Generative AI. 

Built with **NestJS** and **Google Gemini**, it orchestrates complex AI pipelines to generate lifestyle imagery, social media captions, and SEO-optimized product listings from a single uploaded image. The system features a robust credit-based monetization model, user subscriptions, and asset management.



## ✨ Key Features

- **AI Image Orchestration:** Transforms raw product photos into multiple marketing variations (Hero Shot, Lifestyle, Detail) using Gemini 1.5 Flash.
- **Text Generation:** Auto-generates brand-aligned social media captions and SEO keywords.
- **Smart Queueing:** Sequential processing to handle AI rate limits and ensure stability.
- **Credit Wallet System:** Transactional credit deduction logic (`Users` -> `Wallets`).
- **Project Management:** Organizes generation sessions into "Projects" with history tracking.
- **Bookmarks:** Allows users to save specific generated assets (Images/Text) from any project.
- **Cloud Storage:** Secure file handling using Google Cloud Storage (GCS) with signed URLs.
- **Modular Architecture:** Decoupled modules for Auth, Generation, Projects, and Payments.

## 🛠️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Language:** TypeScript (Strict Mode)
- **Database:** MongoDB (Mongoose ODM)
- **AI Model:** Google Gemini (via `@google/genai` SDK)
- **File Storage:** Google Cloud Storage (GCS)
- **Authentication:** JWT & RBAC (Role-Based Access Control)
- **Image Processing:** Sharp (for resizing/optimization)

## 📂 Module Overview

| Module | Description |
| :--- | :--- |
| **Auth** | User registration, Login, JWT Strategy, Role Guards. |
| **Users** | User profile management, Subscription status, Credit tracking. |
| **Generation** | The core "Brain". Handles file upload, prompt engineering, and AI API orchestration. |
| **Projects** | Stores history of generation sessions (`Projects` collection). |
| **Bookmarks** | Manages user favorites (`UserBookmarks` collection). |
| **Storage** | Abstracted service for GCS file upload/delete operations. |

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Mantaray-Digital/studiofy-be.git](https://github.com/Mantaray-Digital/studiofy-be.git)
cd studiofy-be