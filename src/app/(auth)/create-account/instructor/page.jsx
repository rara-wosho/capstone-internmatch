import { Button } from "@/components/ui/button";
import FormLabel from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/input";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import SubmitButton from "@/components/ui/SubmitButton";
import TertiaryLabel from "@/components/ui/TertiaryLabel";
import Wrapper from "@/components/Wrapper";
import { submitRegistration } from "@/lib/actions/instructor";
import Form from "next/form";

export default function Page() {
    return (
        <div className="min-h-[calc(100svh-60px)] px-3">
            <Wrapper size="sm">
                <SecondaryLabel className="mb-1 md:mb-2">
                    Provide details
                </SecondaryLabel>
                <p className="text-sm mb-4 text-muted-foreground">
                    Before you can create an account, you need to complete the
                    registration form and provide the required verification
                    documents. Our administrators will review your submission,
                    and if approved, you'll be notified by email to set up your
                    instructor account.
                </p>

                <Form
                    action={submitRegistration}
                    className="shadow-xs rounded-xl"
                >
                    <div className="bg-card p-3 md:p-5 lg:p-8 rounded-t-xl border-b">
                        <p className="text-sm text-muted-foreground mb-3">
                            All fields are required
                        </p>
                        <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    name="firstName"
                                    placeholder="Mark"
                                    required
                                />
                            </div>
                            <div>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    name="lastName"
                                    placeholder="Reyes"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <FormLabel>Valid Email Address</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="sample@gmail.com"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <FormLabel>Institution/School</FormLabel>
                            <Input
                                name="school"
                                placeholder="Montello High College"
                                required
                            />
                        </div>
                    </div>
                    <div className="bg-card p-3 md:p-5 lg:p-8 border-b">
                        <div className="mb-3">
                            <FormLabel>Barangay</FormLabel>
                            <Input
                                name="barangay"
                                placeholder="San Isidro"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <FormLabel>City/Municipality</FormLabel>
                            <Input
                                name="city"
                                placeholder="Davao City"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <FormLabel>Province</FormLabel>
                            <Input
                                name="province"
                                placeholder="Davao del Sur"
                                required
                            />
                        </div>
                    </div>
                    <div className="bg-card p-3 md:p-5 lg:p-8 rounded-b-xl">
                        <TertiaryLabel>Verification Documents</TertiaryLabel>

                        <p className="mb-1 mt-4">Requirements</p>
                        <ul className="list-disc ps-3 text-sm text-muted-foreground mb-4">
                            <li>Valid ID (Government-issued)</li>
                            <li>
                                Certificate of Employment or Teaching
                                Credentials
                            </li>
                        </ul>
                        <p className="mb-1 mt-4">Steps</p>
                        <ul className="list-decimal ps-3 text-sm text-muted-foreground mb-5">
                            <li>Upload your documents to Google Drive</li>
                            <li>
                                Set sharing permissions to "Anyone with the link
                                can view"
                            </li>
                            <li>Copy and paste the link below</li>
                        </ul>
                        <div className="mb-3">
                            <FormLabel>
                                Google Drive Link to Documents
                            </FormLabel>
                            <Input
                                name="documentsLink"
                                type="url"
                                placeholder="https://drive.google.com/sampleId"
                                required
                            />
                        </div>

                        <div className="mt-4 md:mt-6 flex justify-end">
                            <SubmitButton
                                type="submit"
                                className="grow sm:grow-0"
                            >
                                Submit Form
                            </SubmitButton>
                        </div>
                    </div>
                </Form>

                <p className="text-sm text-muted-foreground py-4 w-full text-center">
                    By submitting the form, you agree that the information you
                    provided is true and will be used for account verification
                    and approval.
                </p>
            </Wrapper>
        </div>
    );
}
