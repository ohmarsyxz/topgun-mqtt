# Use Python 3 as the base image
FROM python:3

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first
COPY requirement.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirement.txt

# Copy the application code
COPY app.py .

# Run the application
CMD ["python", "app.py"]
