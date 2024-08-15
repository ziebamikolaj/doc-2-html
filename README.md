![Workflow Status](https://github.com/ziebamikolaj/DocsConvert/actions/workflows/conventional_commits.yml/badge.svg)
![Workflow Status](https://github.com/ziebamikolaj/DocsConvert/actions/workflows/main-ci.yml/badge.svg)

# DocsConvert

DocsConvert is a subscription-based document conversion service built with Next.js. Users can upload files in .docx, .doc, .pdf, and .odt formats and convert them to HTML/HTL/XML. The service offers a free tier for up to 10 pages, with additional pages available for a small fee. The output is highly customizable.

## Features

- **File Upload**: Accepts .docx, .doc, .pdf, and .odt formats.
- **Conversion**: Converts documents to HTML/HTL/XML formats with preserved formatting.
- **Subscription Model**: Free tier for up to 10 page conversions, with a paid tier for additional pages.
- **Customization**: Options to customize the output format and preserve or strip certain elements.
- **User Dashboard**: Track usage and subscription status.
- **Responsive Design**: Optimized for various devices.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Nest.js, Prisma ORM
- **Database**: PostgreSQL (production)
- **Hosting**: Vercel
- **Icons**: react-icons

## About the Backend

The backend of DocsConvert handles the file conversion processes and manages user subscriptions. Due to the nature of these operations and to ensure security and privacy, the backend code is not included in this public repository. This separation is essential to maintain the integrity of the subscription model and to protect user data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- **Free Tier**: Convert up to 10 pages for free.
- **Paid Tier**: Subscribe for additional page conversions at a small fee per page.

This model ensures that we can provide a reliable and high-quality service while covering the necessary backend infrastructure and operational costs.

## Usage

### Uploading and Converting Files

1. **Upload a file**: Drag and drop your document into the upload area or click to select a file.
2. **Customize the output**: Choose your desired output format (HTML/HTL/XML) and any customization options.
3. **Convert**: Click the "Convert" button to process your file.
4. **Download**: Once the conversion is complete, download your converted file.

### Subscription Management

- **Free Tier**: Convert up to 10 pages for free.
- **Paid Tier**: Subscribe for additional page conversions at a small fee per page.

## Contributing

We welcome contributions to improve the frontend and user experience of DocsConvert! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [Vercel](https://vercel.com/)
